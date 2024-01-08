import { Resolver } from '@nestjs/graphql'
import { ApiAppBotService } from '@pubkey-link/api-app-bot-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAppBotInput,
  AdminFindManyAppBotInput,
  AppBot,
  AppBotPaging,
  AdminUpdateAppBotInput,
} from '@pubkey-link/api-app-bot-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminAppBotResolver {
  constructor(private readonly service: ApiAppBotService) {}

  @Mutation(() => AppBot, { nullable: true })
  adminCreateAppBot(@Args('input') input: AdminCreateAppBotInput) {
    return this.service.admin.createAppBot(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteAppBot(@Args('appBotId') appBotId: string) {
    return this.service.admin.deleteAppBot(appBotId)
  }

  @Query(() => AppBotPaging)
  adminFindManyAppBot(@Args('input') input: AdminFindManyAppBotInput) {
    return this.service.admin.findManyAppBot(input)
  }

  @Query(() => AppBot, { nullable: true })
  adminFindOneAppBot(@Args('appBotId') appBotId: string) {
    return this.service.admin.findOneAppBot(appBotId)
  }

  @Mutation(() => AppBot, { nullable: true })
  adminUpdateAppBot(@Args('appBotId') appBotId: string, @Args('input') input: AdminUpdateAppBotInput) {
    return this.service.admin.updateAppBot(appBotId, input)
  }
}
