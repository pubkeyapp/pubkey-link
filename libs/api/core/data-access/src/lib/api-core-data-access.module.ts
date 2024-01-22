import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCoreProvisionService } from './api-core-provision.service'
import { ApiCoreService } from './api-core.service'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation-schema'
import { AppContext } from './entity/app-context'
import { serveStaticFactory } from './helpers/serve-static-factory'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      sortSchema: true,
      driver: ApolloDriver,
      introspection: process.env['GRAPHQL_PLAYGROUND']?.toLowerCase() === 'true',
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      resolvers: {
        // JSON: GraphQLJSON,
      },
      context: ({ req, res }: AppContext) => ({ req, res }),
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
  ],
  providers: [ApiCoreService, ApiCoreConfigService, ApiCoreProvisionService],
  exports: [ApiCoreService],
})
export class ApiCoreDataAccessModule {}
