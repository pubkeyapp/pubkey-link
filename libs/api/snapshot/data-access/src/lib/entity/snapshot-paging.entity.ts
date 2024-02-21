import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { Snapshot } from './snapshot.entity'

@ObjectType()
export class SnapshotPaging extends PagingResponse<Snapshot>(Snapshot) {}
