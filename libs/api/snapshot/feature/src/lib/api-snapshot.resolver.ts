import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Role } from '@pubkey-link/api-role-data-access'
import { ApiSnapshotService, Snapshot } from '@pubkey-link/api-snapshot-data-access'

@Resolver(() => Snapshot)
export class ApiSnapshotResolver {
  constructor(private readonly service: ApiSnapshotService) {}

  @ResolveField(() => Role, { nullable: true })
  role(@Parent() snapshot: Snapshot) {
    return snapshot.role
  }
}
