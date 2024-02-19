import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster } from '../entity/network-cluster.enum'

@InputType()
export class AdminCreateNetworkInput {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  name!: string
  @Field()
  endpoint!: string
}
