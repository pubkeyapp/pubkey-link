import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkCluster } from '@prisma/client'

@ObjectType()
export class CacheStatus {
  @Field(() => Boolean)
  enabled!: boolean
  @Field(() => Boolean)
  restEnabled!: boolean
  @Field(() => [CacheGroup])
  caches!: CacheGroup[]
}

@ObjectType()
export class CacheGroup {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field(() => [CacheResolver])
  resolvers!: CacheResolver[]
}

@ObjectType()
export class CacheResolver {
  @Field(() => String)
  id!: string
  @Field(() => String)
  address!: string
  @Field(() => String)
  type!: string
}
