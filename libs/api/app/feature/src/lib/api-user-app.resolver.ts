import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  ApiAppService,
  App,
  AppPaging,
  UserCreateAppInput,
  UserFindManyAppInput,
  UserUpdateAppInput,
} from '@pubkey-link/api-app-data-access'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@pubkey-link/api-auth-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserAppResolver {
  constructor(private readonly service: ApiAppService) {}

  @Mutation(() => App, { nullable: true })
  userCreateApp(@CtxUser() user: { id: string }, @Args('input') input: UserCreateAppInput) {
    return this.service.user.createApp(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteApp(@CtxUser() user: { id: string }, @Args('appId') appId: string) {
    return this.service.user.deleteApp(user.id, appId)
  }

  @Query(() => AppPaging)
  userFindManyApp(@CtxUser() user: { id: string }, @Args('input') input: UserFindManyAppInput) {
    return this.service.user.findManyApp(user.id, input)
  }

  @Query(() => App, { nullable: true })
  userFindOneApp(@CtxUser() user: { id: string }, @Args('appId') appId: string) {
    return this.service.user.findOneApp(user.id, appId)
  }

  @Mutation(() => App, { nullable: true })
  userUpdateApp(
    @CtxUser() user: { id: string },
    @Args('appId') appId: string,
    @Args('input') input: UserUpdateAppInput,
  ) {
    return this.service.user.updateApp(user.id, appId, input)
  }
}
