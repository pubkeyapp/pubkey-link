import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ScheduledJob } from './entity/scheduled-job'

@Injectable()
export class ApiScheduleService {
  private readonly logger = new Logger(ApiScheduleService.name)

  constructor(private readonly core: ApiCoreService) {}

  jobs() {
    const jobs: ScheduledJob[] = []

    for (const [name, job] of this.core.scheduler.getCronJobs().entries()) {
      jobs.push({
        name,
        job: {
          running: job.running.toString(),
          runOnce: job.runOnce.toString(),
          cronTime: job.cronTime.toString(),
          lastExecution: job.lastExecution?.toLocaleString() ?? '',
          nextExecution: job.cronTime.sendAt().toJSDate().toLocaleString() ?? '',
        },
      })
    }

    return jobs.sort((a, b) => a.name.localeCompare(b.name))
  }
}
