import { Resolver } from '@nestjs/graphql'
import { ApiAppService } from '@pubkey-link/api-app-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAppInput,
  AdminFindManyAppInput,
  App,
  AppPaging,
  AdminUpdateAppInput,
} from '@pubkey-link/api-app-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminAppResolver {
  constructor(private readonly service: ApiAppService) {}

  @Mutation(() => App, { nullable: true })
  adminCreateApp(@Args('input') input: AdminCreateAppInput) {
    return this.service.admin.createApp(input)
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
