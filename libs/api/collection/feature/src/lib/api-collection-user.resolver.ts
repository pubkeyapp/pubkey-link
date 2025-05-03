import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import { ApiCollectionService, Collection } from '@pubkey-link/api-collection-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCollectionUserResolver {
  constructor(private readonly service: ApiCollectionService) {}

  @Query(() => [Collection], { nullable: true })
  userCollectionFindMany() {
    return this.service.findMany()
  }

  @Query(() => Collection, { nullable: true })
  userCollectionFindOne(@Args('collectionId') collectionId: string) {
    return this.service.findOne(collectionId)
  }
}
