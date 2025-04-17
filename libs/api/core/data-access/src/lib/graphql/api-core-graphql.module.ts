import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppContext } from '../entity/app-context'
import { join } from 'path'

const isPlaygroundEnabled = process.env['GRAPHQL_PLAYGROUND']?.toLowerCase() === 'true';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      sortSchema: true,
      driver: ApolloDriver,
      introspection: isPlaygroundEnabled,
      playground: isPlaygroundEnabled ? {
        settings: {
          'request.credentials': 'include',
        },
      } : false,
      resolvers: {
        // JSON: GraphQLJSON,
      },
      context: ({ req, res }: AppContext) => ({ req, res }),
    }),
  ],
})
export class ApiCoreGraphQLModule {}
