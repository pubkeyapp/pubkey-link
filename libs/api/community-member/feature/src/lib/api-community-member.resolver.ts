import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiCommunityMemberService, CommunityMember } from '@pubkey-link/api-community-member-data-access'
import { Rule } from '@pubkey-link/api-rule-data-access'

@Resolver(() => CommunityMember)
export class ApiCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}

  @ResolveField(() => [Rule], { nullable: true })
  rules(@Parent() member: CommunityMember) {
    return member.rules?.length ? member.rules.map((r) => r.rule) : []
  }
}
