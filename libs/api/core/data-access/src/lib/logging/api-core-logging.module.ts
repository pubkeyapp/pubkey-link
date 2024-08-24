import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { OgmaInterceptor, OgmaModule } from '@ogma/nestjs-module'
import { ExpressParser } from '@ogma/platform-express'
import { GraphQLParser } from '@ogma/platform-graphql'
import { ApiCoreConfigModule } from '../config/api-core-config.module'
import { ApiCoreConfigService } from '../config/api-core-config.service'

@Module({
  imports: [
    OgmaModule.forRootAsync({
      imports: [ApiCoreConfigModule],
      inject: [ApiCoreConfigService],
      useFactory: (config: ApiCoreConfigService) => ({
        color: config.logColor,
        json: config.logJson,
        logLevel: config.logLevel,
        application: 'pubkey-link',
        config: {
          interceptor: {
            http: ExpressParser,
            ws: false,
            gql: GraphQLParser,
            rpc: false,
          },
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
    ExpressParser,
    GraphQLParser,
  ],
})
export class ApiCoreLoggingModule {}
