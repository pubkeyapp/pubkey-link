import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { NetworkTokenType } from '@pubkey-link/api-network-token-data-access'

@InputType()
export class AdminFindManyNetworkAssetInput extends PagingInput() {
  @Field(() => NetworkTokenType, { nullable: true })
  type?: NetworkTokenType
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field({ nullable: true })
  search?: string
}
