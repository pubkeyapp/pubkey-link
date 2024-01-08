import { getSdk, Sdk } from '../generated/graphql-sdk'
import { getGraphQLClient } from './get-graphql-client'

export function getGraphQLSdk(url: string): Sdk {
  return getSdk(getGraphQLClient(url))
}
