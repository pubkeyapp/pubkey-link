import { UseGuards } from '@nestjs/common'
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserStatus } from '@prisma/client'
import { ApiAuthGraphQLUserGuard, ApiAuthService, CtxUser } from '@pubkey-link/api-auth-data-access'
import { AppContext } from '@pubkey-link/api-core-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver()
export class ApiAuthResolver {
  constructor(private readonly service: ApiAuthService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(new ApiAuthGraphQLUserGuard([UserStatus.Active, UserStatus.Created]))
  async me(@CtxUser() user: User) {
    return user
  }

  @Mutation(() => Boolean, { nullable: true })
  async logout(@Context() context: AppContext) {
    return this.service.logout(context)
  }
}
