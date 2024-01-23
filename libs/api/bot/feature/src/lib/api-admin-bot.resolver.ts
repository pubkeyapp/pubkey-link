import { Resolver } from '@nestjs/graphql'
import { ApiBotService } from '@pubkey-link/api-bot-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateBotInput,
  AdminFindManyBotInput,
  Bot,
  BotPaging,
  AdminUpdateBotInput,
} from '@pubkey-link/api-bot-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminBotResolver {
  constructor(private readonly service: ApiBotService) {}

  @Mutation(() => Bot, { nullable: true })
  adminCreateBot(@Args('input') input: AdminCreateBotInput) {
    return this.service.admin.createBot(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteBot(@Args('botId') botId: string) {
    return this.service.admin.deleteBot(botId)
  }

  @Query(() => BotPaging)
  adminFindManyBot(@Args('input') input: AdminFindManyBotInput) {
    return this.service.admin.findManyBot(input)
  }

  @Query(() => Bot, { nullable: true })
  adminFindOneBot(@Args('botId') botId: string) {
    return this.service.admin.findOneBot(botId)
  }

  @Mutation(() => Bot, { nullable: true })
  adminUpdateBot(@Args('botId') botId: string, @Args('input') input: AdminUpdateBotInput) {
    return this.service.admin.updateBot(botId, input)
  }
}
