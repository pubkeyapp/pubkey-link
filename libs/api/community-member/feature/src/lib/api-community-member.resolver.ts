import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiCommunityMemberService, CommunityMember } from '@pubkey-link/api-community-member-data-access'
import { Role } from '@pubkey-link/api-role-data-access'

@Resolver(() => CommunityMember)
export class ApiCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}

  @ResolveField(() => [Role], { nullable: true })
  roles(@Parent() member: CommunityMember) {
    return member.roles?.length ? member.roles.map((r) => r.role) : []
  }
}
