import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiCollectionAssetService,
  ApiCollectionService,
  Collection,
  CollectionAsset,
  UserCollectionAssetFindManyInput,
  UserCollectionCreateInput,
  UserCollectionFindManyInput,
} from '@pubkey-link/api-collection-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCollectionAssetUserResolver {
  constructor(private readonly service: ApiCollectionAssetService) {}

  @Query(() => [CollectionAsset], { nullable: true })
  userCollectionAssetFindMany(@Args('input') input: UserCollectionAssetFindManyInput) {
    return this.service.findMany(input)
  }
}
