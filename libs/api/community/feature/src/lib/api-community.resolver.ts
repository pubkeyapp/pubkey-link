import { Resolver } from '@nestjs/graphql'
import { ApiCommunityService } from '@pubkey-link/api-community-data-access'
import { Community } from '@pubkey-link/api-community-data-access'

@Resolver(() => Community)
export class ApiCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}
}
