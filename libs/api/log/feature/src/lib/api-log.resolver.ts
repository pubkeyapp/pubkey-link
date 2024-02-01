import { Resolver } from '@nestjs/graphql'
import { ApiLogService } from '@pubkey-link/api-log-data-access'
import { Log } from '@pubkey-link/api-log-data-access'

@Resolver(() => Log)
export class ApiLogResolver {
  constructor(private readonly service: ApiLogService) {}
}
