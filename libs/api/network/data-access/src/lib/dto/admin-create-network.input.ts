import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster } from '../entity/network-cluster.enum'
import { NetworkType } from '../entity/network-type.enum'

@InputType()
export class AdminCreateNetworkInput {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field(() => NetworkType)
  type!: NetworkType
  @Field()
  name!: string
  @Field()
  decimals!: number
  @Field()
  endpoint!: string
  @Field()
  explorerUrl!: string
  @Field()
  symbol!: string
}
