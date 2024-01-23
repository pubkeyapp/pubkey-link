import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'

@InputType()
export class AdminCreateNetworkTokenInput {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  account!: string
}
