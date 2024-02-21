import { Resolver } from '@nestjs/graphql'
import { ApiSnapshotService } from '@pubkey-link/api-snapshot-data-access'
import { Snapshot } from '@pubkey-link/api-snapshot-data-access'

@Resolver(() => Snapshot)
export class ApiSnapshotResolver {
  constructor(private readonly service: ApiSnapshotService) {}
}
