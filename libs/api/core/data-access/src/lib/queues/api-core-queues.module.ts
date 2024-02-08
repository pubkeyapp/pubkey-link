import { ExpressAdapter } from '@bull-board/express'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiCoreConfigModule } from '../config/api-core-config.module'
import { ApiCoreConfigService } from '../config/api-core-config.service'
import { BullDashboardMiddleware } from './bull-dashboard-middleware'

const logoUrl = 'https://avatars.githubusercontent.com/u/125477168?v=4'
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ApiCoreConfigModule],
      useFactory: async (config: ApiCoreConfigService) => ({
        prefix: 'pubkey:api',
        connection: config.redisOptions,
        defaultJobOptions: {
          removeOnFail: { age: 24 * 3600 },
        },
      }),
      inject: [ApiCoreConfigService],
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      boardOptions: {
        uiConfig: {
          boardTitle: 'PubKey API',
          boardLogo: { path: logoUrl },
          favIcon: { default: logoUrl, alternative: logoUrl },
        },
      },
      adapter: ExpressAdapter,
      middleware: BullDashboardMiddleware,
    }),
  ],
})
export class ApiCoreQueuesModule {}
