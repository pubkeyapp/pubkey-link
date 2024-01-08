import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@pubkey-link/api-auth-data-access'
import {
  ApiUserService,
  User,
  UserFindManyUserInput,
  UserPaging,
  UserUpdateUserInput,
} from '@pubkey-link/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserUserResolver {
  constructor(private readonly service: ApiUserService) {}

  @Query(() => UserPaging)
  userFindManyUser(@Args('input') input: UserFindManyUserInput) {
    return this.service.user.findManyUser(input)
  }

  @Query(() => User, { nullable: true })
  userFindOneUser(@Args('username') username: string) {
    return this.service.user.findOneUser(username)
  }

  @Mutation(() => User, { nullable: true })
  userUpdateUser(@CtxUser() user: User, @Args('input') input: UserUpdateUserInput) {
    return this.service.user.updateUser(user.id as string, input)
  }
}
