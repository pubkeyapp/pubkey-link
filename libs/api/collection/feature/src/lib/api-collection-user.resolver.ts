import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiCollectionService,
  Collection,
  UserCollectionCreateInput,
  UserCollectionFindManyInput,
} from '@pubkey-link/api-collection-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCollectionUserResolver {
  constructor(private readonly service: ApiCollectionService) {}

  @Query(() => [Collection], { nullable: true })
  userCollectionFindMany(@Args('input') input: UserCollectionFindManyInput) {
    return this.service.findMany(input)
  }

  @Query(() => Collection, { nullable: true })
  userCollectionFindOne(@Args('collectionId') collectionId: string) {
    return this.service.findOne(collectionId)
  }

  @Mutation(() => Collection, { nullable: true })
  userCollectionCreate(@CtxUserId() userId: string, @Args('input') input: UserCollectionCreateInput) {
    return this.service.createCollection(userId, input)
  }

  @Mutation(() => Collection, { nullable: true })
  userCollectionDelete(@CtxUserId() userId: string, @Args('collectionId') collectionId: string) {
    return this.service.deleteCollection(userId, collectionId)
  }
}
