import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { NetworkAsset } from './network-asset.entity'

@ObjectType()
export class NetworkAssetPaging extends PagingResponse<NetworkAsset>(NetworkAsset) {}
