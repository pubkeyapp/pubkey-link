import { GraphQLClient } from 'graphql-request'
import { responseMiddleware } from './response-middleware'

export function getGraphQLClient(url: string) {
  return new GraphQLClient(url, {
    credentials: 'include',
    mode: 'cors',
    responseMiddleware,
  })
}
