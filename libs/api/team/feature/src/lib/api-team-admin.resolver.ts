import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminFindManyTeamInput,
  AdminUpdateTeamInput,
  ApiTeamService,
  Team,
  TeamPaging,
} from '@pubkey-link/api-team-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiTeamAdminResolver {
  constructor(private readonly service: ApiTeamService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteTeam(@Args('teamId') teamId: string) {
    return this.service.admin.deleteTeam(teamId)
  }

  @Query(() => TeamPaging)
  adminFindManyTeam(@Args('input') input: AdminFindManyTeamInput) {
    return this.service.admin.findManyTeam(input)
  }

  @Query(() => Team, { nullable: true })
  adminFindOneTeam(@Args('teamId') teamId: string) {
    return this.service.admin.findOneTeam(teamId)
  }

  @Mutation(() => Team, { nullable: true })
  adminUpdateTeam(@Args('teamId') teamId: string, @Args('input') input: AdminUpdateTeamInput) {
    return this.service.admin.updateTeam(teamId, input)
  }
}
