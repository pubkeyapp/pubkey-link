import { Resolver } from '@nestjs/graphql'
import { ApiCollectionService } from '@pubkey-link/api-collection-data-access'
import { Collection } from '@pubkey-link/api-collection-data-access'

@Resolver(() => Collection)
export class ApiCollectionResolver {
  constructor(private readonly service: ApiCollectionService) {}
}
