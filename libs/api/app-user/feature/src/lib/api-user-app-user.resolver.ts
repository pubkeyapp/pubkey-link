import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  AdminCreateAppUserInput,
  AdminFindManyAppUserInput,
  AdminUpdateAppUserInput,
  ApiAppUserService,
  AppUser,
  AppUserPaging,
} from '@pubkey-link/api-app-user-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminAppUserResolver {
  constructor(private readonly service: ApiAppUserService) {}

  @Mutation(() => AppUser, { nullable: true })
  adminCreateAppUser(@Args('input') input: AdminCreateAppUserInput) {
    return this.service.admin.createAppUser(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteAppUser(@Args('appUserId') appUserId: string) {
    return this.service.admin.deleteAppUser(appUserId)
  }

  @Query(() => AppUserPaging)
  adminFindManyAppUser(@Args('input') input: AdminFindManyAppUserInput) {
    return this.service.admin.findManyAppUser(input)
  }

  @Query(() => AppUser, { nullable: true })
  adminFindOneAppUser(@Args('appUserId') appUserId: string) {
    return this.service.admin.findOneAppUser(appUserId)
  }

  @Mutation(() => AppUser, { nullable: true })
  adminUpdateAppUser(@Args('appUserId') appUserId: string, @Args('input') input: AdminUpdateAppUserInput) {
    return this.service.admin.updateAppUser(appUserId, input)
  }
}
