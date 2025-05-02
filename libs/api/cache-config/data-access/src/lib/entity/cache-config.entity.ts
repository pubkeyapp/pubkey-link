import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CacheConfigKey, CacheConfigType } from '@prisma/client'

@ObjectType()
export class CacheConfig {
  @Field(() => CacheConfigKey)
  key!: CacheConfigKey
  @Field(() => CacheConfigType)
  type!: CacheConfigType
  @Field(() => String)
  value!: string
}

export { CacheConfigKey, CacheConfigType }

registerEnumType(CacheConfigKey, { name: 'CacheConfigKey' })
registerEnumType(CacheConfigType, { name: 'CacheConfigType' })
