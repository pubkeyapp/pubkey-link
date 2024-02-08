import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppContext } from '../entity/app-context'
import { join } from 'path'

@Module({
  imports: [
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
  ],
})
export class ApiCoreGraphQLModule {}
