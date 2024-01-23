import { Resolver } from '@nestjs/graphql'
import { ApiCommunityMemberService } from '@pubkey-link/api-community-member-data-access'
import { CommunityMember } from '@pubkey-link/api-community-member-data-access'

@Resolver(() => CommunityMember)
export class ApiCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}
}
