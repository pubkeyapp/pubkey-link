import { Resolver } from '@nestjs/graphql'
import { ApiResolverService, Resolver as ResolverType } from '@pubkey-link/api-resolver-data-access'

@Resolver(() => ResolverType)
export class ApiResolverResolver {
  constructor(private readonly service: ApiResolverService) {}
}
