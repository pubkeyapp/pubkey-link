import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  AdminCreateAppInput,
  AdminFindManyAppInput,
  AdminUpdateAppInput,
  ApiAppService,
  App,
  AppPaging,
} from '@pubkey-link/api-app-data-access'
import { ApiAuthGraphQLAdminGuard, CtxUser } from '@pubkey-link/api-auth-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminAppResolver {
  constructor(private readonly service: ApiAppService) {}

  @Mutation(() => App, { nullable: true })
  adminCreateApp(@CtxUser() user: { id: string }, @Args('input') input: AdminCreateAppInput) {
    return this.service.admin.createApp(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteApp(@Args('appId') appId: string) {
    return this.service.admin.deleteApp(appId)
  }

  @Query(() => AppPaging)
  adminFindManyApp(@Args('input') input: AdminFindManyAppInput) {
    return this.service.admin.findManyApp(input)
  }

  @Query(() => App, { nullable: true })
  adminFindOneApp(@Args('appId') appId: string) {
    return this.service.admin.findOneApp(appId)
  }

  @Mutation(() => App, { nullable: true })
  adminUpdateApp(@Args('appId') appId: string, @Args('input') input: AdminUpdateAppInput) {
    return this.service.admin.updateApp(appId, input)
  }
}
