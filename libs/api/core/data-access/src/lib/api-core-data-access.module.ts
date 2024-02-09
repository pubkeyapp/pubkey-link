import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApiCoreProvisionService } from './api-core-provision.service'
import { ApiCoreService } from './api-core.service'
import { ApiCoreConfigModule } from './config/api-core-config.module'
import { ApiCoreGraphQLModule } from './graphql/api-core-graphql.module'
import { serveStaticFactory } from './helpers/serve-static-factory'
import { ApiCoreMetricsModule } from './metrics/api-core-metrics.module'
import { ApiCoreQueuesModule } from './queues/api-core-queues.module'

@Module({
  imports: [
    ApiCoreConfigModule,
    ApiCoreGraphQLModule,
    ApiCoreMetricsModule,
    ApiCoreQueuesModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
  ],
  providers: [ApiCoreService, ApiCoreProvisionService],
  exports: [ApiCoreService, ApiCoreMetricsModule],
})
export class ApiCoreDataAccessModule {}
