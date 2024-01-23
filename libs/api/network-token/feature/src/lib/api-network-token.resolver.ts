import { Resolver } from '@nestjs/graphql'
import { ApiNetworkTokenService } from '@pubkey-link/api-network-token-data-access'
import { NetworkToken } from '@pubkey-link/api-network-token-data-access'

@Resolver(() => NetworkToken)
export class ApiNetworkTokenResolver {
  constructor(private readonly service: ApiNetworkTokenService) {}
}
