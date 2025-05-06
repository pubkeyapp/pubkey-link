import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminCreateResolverInput,
  AdminFindManyResolverInput,
  AdminUpdateResolverInput,
  ApiResolverService,
  Resolver as ResolverType,
  ResolverPaging,
} from '@pubkey-link/api-resolver-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiResolverAdminResolver {
  constructor(private readonly service: ApiResolverService) {}

  @Mutation(() => ResolverType, { nullable: true })
  adminCreateResolver(@Args('input') input: AdminCreateResolverInput) {
    return this.service.admin.createResolver(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteResolver(@Args('resolverId') resolverId: string) {
    return this.service.admin.deleteResolver(resolverId)
  }

  @Query(() => ResolverPaging)
  adminFindManyResolver(@Args('input') input: AdminFindManyResolverInput) {
    return this.service.admin.findManyResolver(input)
  }

  @Query(() => ResolverType, { nullable: true })
  adminFindOneResolver(@Args('resolverId') resolverId: string) {
    return this.service.admin.findOneResolver(resolverId)
  }

  @Mutation(() => ResolverType, { nullable: true })
  adminUpdateResolver(@Args('resolverId') resolverId: string, @Args('input') input: AdminUpdateResolverInput) {
    return this.service.admin.updateResolver(resolverId, input)
  }
}
