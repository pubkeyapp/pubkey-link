import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApiCoreService } from './api-core.service'
import { ApiCoreConfigModule } from './config/api-core-config.module'
import { ApiCoreGraphQLModule } from './graphql/api-core-graphql.module'
import { serveStaticFactory } from './helpers/serve-static-factory'
import { ApiCoreLoggingModule } from './logging/api-core-logging.module'
import { ApiCoreMetricsModule } from './metrics/api-core-metrics.module'
import { ApiCoreQueuesModule } from './queues/api-core-queues.module'

@Module({
  imports: [
    ApiCoreConfigModule,
    ApiCoreGraphQLModule,
    ApiCoreLoggingModule,
    ApiCoreMetricsModule,
    ApiCoreQueuesModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
  ],
  providers: [ApiCoreService],
  exports: [ApiCoreService, ApiCoreMetricsModule],
})
export class ApiCoreDataAccessModule {}
