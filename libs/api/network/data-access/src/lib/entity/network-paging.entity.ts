import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { Network } from './network.entity'

@ObjectType()
export class NetworkPaging extends PagingResponse<Network>(Network) {}
