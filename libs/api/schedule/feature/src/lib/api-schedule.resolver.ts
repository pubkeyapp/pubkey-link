import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { ApiScheduleService, ScheduledJob } from '@pubkey-link/api-schedule-data-access'

@Resolver(() => ScheduledJob)
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiScheduleResolver {
  constructor(private readonly service: ApiScheduleService) {}

  @Query(() => [ScheduledJob])
  adminScheduledJobs() {
    return this.service.jobs()
  }
}
