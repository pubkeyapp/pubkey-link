import { Resolver } from '@nestjs/graphql'
import { ApiAllocationService } from '@pubkey-link/api-allocation-data-access'
import { Allocation } from '@pubkey-link/api-allocation-data-access'

@Resolver(() => Allocation)
export class ApiAllocationResolver {
  constructor(private readonly service: ApiAllocationService) {}
}
