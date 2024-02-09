import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiBotService,
  Bot,
  BotMember,
  DiscordRole,
  DiscordServer,
  UserCreateBotInput,
  UserUpdateBotInput,
} from '@pubkey-link/api-bot-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserBotResolver {
  constructor(private readonly service: ApiBotService) {}

  @Mutation(() => Bot, { nullable: true })
  userCreateBot(@CtxUserId() userId: string, @Args('input') input: UserCreateBotInput) {
    return this.service.user.createBot(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteBot(@CtxUserId() userId: string, @Args('botId') botId: string) {
    return this.service.user.deleteBot(userId, botId)
  }

  @Query(() => Bot, { nullable: true })
  userFindOneBot(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.user.findOneBot(userId, communityId)
  }

  @Mutation(() => Bot, { nullable: true })
  userUpdateBot(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('input') input: UserUpdateBotInput) {
    return this.service.user.updateBot(userId, botId, input)
  }

  @Query(() => [DiscordServer], { nullable: true })
  userGetBotServers(@CtxUserId() userId: string, @Args('botId') botId: string) {
    return this.service.manager.getBotServers(userId, botId)
  }

  @Query(() => DiscordServer, { nullable: true })
  userGetBotServer(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotServer(botId, serverId)
  }

  @Query(() => [DiscordRole], { nullable: true })
  userGetBotRoles(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotRoles(userId, botId, serverId)
  }

  @Query(() => [BotMember], { nullable: true })
  userGetBotMembers(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.member.getBotMembers(userId, botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userLeaveBotServer(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.leaveBotServer(userId, botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userSyncBotServer(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.syncBotServer(userId, botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userStartBot(@CtxUserId() userId: string, @Args('botId') botId: string) {
    return this.service.manager.userStartBot(userId, botId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userStopBot(@CtxUserId() userId: string, @Args('botId') botId: string) {
    return this.service.manager.userStopBot(userId, botId)
  }
}
