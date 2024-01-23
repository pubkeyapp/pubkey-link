import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { NetworkToken } from './network-token.entity'

@ObjectType()
export class NetworkTokenPaging extends PagingResponse<NetworkToken>(NetworkToken) {}
