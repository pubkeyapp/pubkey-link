import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'
import { CtxUser } from '@pubkey-link/api-auth-data-access'
import { Identity } from '@pubkey-link/api-identity-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver(() => User)
export class ApiUserResolver {
  @ResolveField(() => Date, { nullable: true })
  createdAt(@CtxUser() actor: User, @Parent() user: User) {
    if (this.isPrivate(actor, user)) {
      return null
    }
    return user.createdAt
  }

  @ResolveField(() => Date, { nullable: true })
  updatedAt(@CtxUser() actor: User, @Parent() user: User) {
    if (this.isPrivate(actor, user)) {
      return null
    }
    return user.updatedAt
  }

  @ResolveField(() => Date, { nullable: true })
  lastLogin(@CtxUser() actor: User, @Parent() user: User) {
    if (this.isPrivate(actor, user)) {
      return null
    }
    return user.lastLogin
  }

  @ResolveField(() => Boolean, { nullable: true })
  developer(@CtxUser() actor: User, @Parent() user: User) {
    if (this.isPrivate(actor, user)) {
      return null
    }
    return user.developer
  }

  @ResolveField(() => String, { nullable: true })
  avatarUrl(@CtxUser() actor: User, @Parent() user: User) {
    if (this.isPrivate(actor, user)) {
      return null
    }
    return user.avatarUrl?.length ? user.avatarUrl : null
  }

  @ResolveField(() => String)
  name(@CtxUser() actor: User, @Parent() user: User) {
    if (this.isPrivate(actor, user)) {
      return null
    }
    return user.name ?? user.username
  }

  @ResolveField(() => String)
  profileUrl(@Parent() user: User) {
    return ['/u', user.username].join('/')
  }

  @ResolveField(() => [Identity], { nullable: true })
  identities(@Parent() user: User) {
    return user.identities ?? []
  }

  private isPrivate(actor: User, user: User) {
    return user.private && actor.id !== user.id && actor.role !== UserRole.Admin
  }
}
