import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiBotService,
  Bot,
  BotMember,
  BotServer,
  DiscordChannel,
  DiscordRole,
  DiscordServer,
  UserCreateBotInput,
  UserUpdateBotInput,
  UserUpdateBotServerInput,
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
  @Query(() => BotServer, { nullable: true })
  userFindOneBotServer(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.user.findOneBotServer(userId, botId, serverId)
  }

  @Mutation(() => Bot, { nullable: true })
  userUpdateBot(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('input') input: UserUpdateBotInput) {
    return this.service.user.updateBot(userId, botId, input)
  }

  @Mutation(() => BotServer, { nullable: true })
  userUpdateBotServer(
    @CtxUserId() userId: string,
    @Args('botId') botId: string,
    @Args('serverId') serverId: string,
    @Args('input') input: UserUpdateBotServerInput,
  ) {
    return this.service.user.updateBotServer(userId, botId, serverId, input)
  }

  @Query(() => [DiscordServer], { nullable: true })
  userGetBotServers(@CtxUserId() userId: string, @Args('botId') botId: string) {
    return this.service.user.userGetBotServers(userId, botId)
  }

  @Query(() => [DiscordChannel], { nullable: true })
  userGetBotChannels(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.user.userGetBotChannels(userId, botId, serverId)
  }

  @Mutation(() => BotServer, { nullable: true })
  userTestBotServerConfig(
    @CtxUserId() userId: string,
    @Args('botId') botId: string,
    @Args('serverId') serverId: string,
  ) {
    return this.service.user.userTestBotServerConfig(userId, botId, serverId)
  }

  @Query(() => [DiscordRole], { nullable: true })
  userGetBotRoles(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.user.userGetBotRoles(userId, botId, serverId)
  }

  @Query(() => [BotMember], { nullable: true })
  userGetBotMembers(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.user.userGetBotMembers(userId, botId, serverId)
  }

  @Query(() => DiscordServer, { nullable: true })
  userGetBotServer(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.user.userGetBotServer(userId, botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userLeaveBotServer(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.user.userLeaveBotServer(userId, botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userStartBot(@CtxUserId() userId: string, @Args('botId') botId: string) {
    return this.service.user.userStartBot(userId, botId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userStopBot(@CtxUserId() userId: string, @Args('botId') botId: string) {
    return this.service.user.userStopBot(userId, botId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userSyncBotServer(@CtxUserId() userId: string, @Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.user.userSyncBotServer(userId, botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userSyncBotServerRoles(
    @CtxUserId() userId: string,
    @Args('botId') botId: string,
    @Args('serverId') serverId: string,
  ) {
    return this.service.user.userSyncBotServerRoles(userId, botId, serverId)
  }
}
