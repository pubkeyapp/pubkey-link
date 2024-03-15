import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiTeamService,
  Team,
  TeamPaging,
  UserCreateTeamInput,
  UserFindManyTeamInput,
  UserUpdateTeamInput,
} from '@pubkey-link/api-team-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiTeamUserResolver {
  constructor(private readonly service: ApiTeamService) {}

  @Mutation(() => Team, { nullable: true })
  userCreateTeam(@CtxUserId() ownerId: string, @Args('input') input: UserCreateTeamInput) {
    return this.service.user.createTeam(ownerId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteTeam(@CtxUserId() ownerId: string, @Args('teamId') teamId: string) {
    return this.service.user.deleteTeam(ownerId, teamId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userAddTeamMember(@CtxUserId() ownerId: string, @Args('teamId') teamId: string, @Args('userId') userId: string) {
    return this.service.user.addTeamMember(ownerId, teamId, userId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userRemoveTeamMember(@CtxUserId() ownerId: string, @Args('teamId') teamId: string, @Args('userId') userId: string) {
    return this.service.user.removeTeamMember(ownerId, teamId, userId)
  }

  @Query(() => TeamPaging)
  userFindManyTeam(@CtxUserId() ownerId: string, @Args('input') input: UserFindManyTeamInput) {
    return this.service.user.findManyTeam(ownerId, input)
  }

  @Query(() => Team, { nullable: true })
  userFindOneTeam(@CtxUserId() ownerId: string, @Args('teamId') teamId: string) {
    return this.service.user.findOneTeam(ownerId, teamId)
  }

  @Mutation(() => Team, { nullable: true })
  userUpdateTeam(
    @CtxUserId() ownerId: string,
    @Args('teamId') teamId: string,
    @Args('input') input: UserUpdateTeamInput,
  ) {
    return this.service.user.updateTeam(ownerId, teamId, input)
  }
}
