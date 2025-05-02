import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { CronExpression } from '@nestjs/schedule'
import { Prisma } from '@prisma/client'
import { ApiCoreService, EVENT_APP_STARTED } from '@pubkey-link/api-core-data-access'
import { CacheConfig, CacheConfigKey, CacheConfigType } from './entity/cache-config.entity'

export const EVENT_CACHE_CONFIG_LOADED = 'cache-config.loaded'

const defaultConfig: Prisma.CacheConfigCreateInput[] = [
  {
    key: CacheConfigKey.CronExpression,
    type: CacheConfigType.String,
    value: CronExpression.EVERY_10_MINUTES,
  },
  {
    key: CacheConfigKey.HeliusApiKey,
    type: CacheConfigType.Secret,
    value: '',
  },
  {
    key: CacheConfigKey.RestEnabled,
    type: CacheConfigType.Boolean,
    value: 'false',
  },
]

@Injectable()
export class ApiCacheConfigService {
  private readonly logger = new Logger(ApiCacheConfigService.name)
  private readonly config = new Map<CacheConfigKey, CacheConfig>()

  constructor(private readonly core: ApiCoreService) {}

  get cacheConfig(): CacheConfig[] {
    return [...this.config.values()]
  }

  get cronExpression(): string {
    return this.config.get(CacheConfigKey.CronExpression)?.value ?? CronExpression.EVERY_10_MINUTES
  }

  get heliusApiKey(): string {
    return this.config.get(CacheConfigKey.HeliusApiKey)?.value ?? ''
  }

  get restEnabled(): boolean {
    return this.config.get(CacheConfigKey.RestEnabled)?.value === 'true'
  }

  @OnEvent(EVENT_APP_STARTED)
  async onApplicationStarted() {
    await this.load()
  }

  async load() {
    const options = await this.ensureDefaultConfig()
    for (const option of options) {
      this.logger.verbose(`[load] ${option.key} => ${printConfig(option)}`)
      this.config.set(option.key, option)
    }
    const config = [...this.config.values()]
    this.core.eventEmitter.emit(EVENT_CACHE_CONFIG_LOADED, config)
    return config
  }

  async updateCacheConfig(key: CacheConfigKey, value: string) {
    const config = this.config.get(key)
    if (!config) {
      throw new Error(`[updateCacheConfig] Cache config not found for key: ${key}`)
    }
    const updated = await this.core.data.cacheConfig.update({ where: { key }, data: { value } })
    if (!updated) {
      throw new Error(`[updateCacheConfig] Failed to update cache config for key: ${key}`)
    }
    this.logger.verbose(`[updateCacheConfig] ${key} => ${printConfig(updated)}`)
    await this.load()
  }

  private async ensureDefaultConfig() {
    const items: CacheConfig[] = []
    for (const item of defaultConfig) {
      const found = await this.core.data.cacheConfig.findUnique({ where: { key: item.key } })
      if (found) {
        items.push(found)
        continue
      }
      const created = await this.core.data.cacheConfig.create({ data: item })
      this.logger.warn(`[ensureDefaultConfig] Created cache config ${created.key} with value ${printConfig(created)}`)
      items.push(created)
    }
    return items
  }
}

function printConfig(config: CacheConfig) {
  return config.type === CacheConfigType.Secret ? `${config.value.substring(0, 4)}****` : config.value
}
