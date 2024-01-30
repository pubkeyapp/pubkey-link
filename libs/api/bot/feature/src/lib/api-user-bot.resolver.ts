import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
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
  userCreateBot(@Args('input') input: UserCreateBotInput) {
    return this.service.user.createBot(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteBot(@Args('botId') botId: string) {
    return this.service.user.deleteBot(botId)
  }

  @Query(() => Bot, { nullable: true })
  userFindOneBot(@Args('communityId') communityId: string) {
    return this.service.user.findOneBot(communityId)
  }

  @Mutation(() => Bot, { nullable: true })
  userUpdateBot(@Args('botId') botId: string, @Args('input') input: UserUpdateBotInput) {
    return this.service.user.updateBot(botId, input)
  }

  @Query(() => [DiscordServer], { nullable: true })
  userGetBotServers(@Args('botId') botId: string) {
    return this.service.manager.getBotServers(botId)
  }

  @Query(() => DiscordServer, { nullable: true })
  userGetBotServer(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotServer(botId, serverId)
  }

  @Query(() => [DiscordRole], { nullable: true })
  userGetBotRoles(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotRoles(botId, serverId)
  }

  @Query(() => [BotMember], { nullable: true })
  userGetBotMembers(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotMembers(botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userLeaveBotServer(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.leaveBotServer(botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userSyncBotServer(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.syncBotServer(botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userStartBot(@Args('botId') botId: string) {
    return this.service.manager.startBot(botId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userStopBot(@Args('botId') botId: string) {
    return this.service.manager.stopBot(botId)
  }
}
