import { Resolver } from '@nestjs/graphql'
import { ApiTeamService } from '@pubkey-link/api-team-data-access'
import { Team } from '@pubkey-link/api-team-data-access'

@Resolver(() => Team)
export class ApiTeamResolver {
  constructor(private readonly service: ApiTeamService) {}
}
