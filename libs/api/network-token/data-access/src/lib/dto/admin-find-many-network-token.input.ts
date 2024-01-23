import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'

@InputType()
export class AdminFindManyNetworkTokenInput extends PagingInput() {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field({ nullable: true })
  search?: string
}
