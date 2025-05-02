import { BadRequestException, Controller, Get, Param, UseGuards } from '@nestjs/common'
import { NetworkCluster } from '@prisma/client'
import { ApiAuthJwtGuard } from '@pubkey-link/api-auth-data-access'
import { ApiCacheService } from '@pubkey-link/api-cache-data-access'

@Controller('cache')
@UseGuards(ApiAuthJwtGuard)
export class ApiCacheController {
  constructor(private readonly service: ApiCacheService) {}

  @Get()
  index() {
    if (!this.service.restEnabled) {
      throw new BadRequestException('REST API is not enabled')
    }
    return this.service.status
  }

  @Get('assets-owner/:cluster/:id/:owner')
  assetsOwner(@Param('cluster') cluster: NetworkCluster, @Param('id') id: string, @Param('owner') owner: string) {
    if (!this.service.restEnabled) {
      throw new BadRequestException('REST API is not enabled')
    }
    return this.service.assetsOwner({ cluster, id, owner })
  }

  @Get('asset-snapshot/:cluster/:id')
  assetSnapshot(@Param('cluster') cluster: NetworkCluster, @Param('id') id: string) {
    if (!this.service.restEnabled) {
      throw new BadRequestException('REST API is not enabled')
    }
    return this.service.assetsSnapshot({ cluster, id })
  }

  @Get('resolve/:cluster/:id')
  resolve(@Param('cluster') cluster: NetworkCluster, @Param('id') id: string) {
    if (!this.service.restEnabled) {
      throw new BadRequestException('REST API is not enabled')
    }
    return this.service.resolveCache({ cluster, id })
  }

  @Get('resolve-all')
  resolveAll() {
    if (!this.service.restEnabled) {
      throw new BadRequestException('REST API is not enabled')
    }
    return this.service.resolveAllCaches()
  }
}
