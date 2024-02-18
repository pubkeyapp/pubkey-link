import { Query, Resolver } from '@nestjs/graphql'
import { ApiCommunityService, Community } from '@pubkey-link/api-community-data-access'

@Resolver()
export class ApiAnonCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Query(() => [Community])
  anonGetCommunities() {
    return this.service.anon.getCommunities()
  }
}
