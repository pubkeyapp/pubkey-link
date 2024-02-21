import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminCreateSnapshotInput,
  AdminFindManySnapshotInput,
  ApiSnapshotService,
  Snapshot,
  SnapshotPaging,
} from '@pubkey-link/api-snapshot-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminSnapshotResolver {
  constructor(private readonly service: ApiSnapshotService) {}

  @Mutation(() => Snapshot, { nullable: true })
  adminCreateSnapshot(@Args('input') input: AdminCreateSnapshotInput) {
    return this.service.admin.createSnapshot(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteSnapshot(@Args('snapshotId') snapshotId: string) {
    return this.service.admin.deleteSnapshot(snapshotId)
  }

  @Query(() => SnapshotPaging)
  adminFindManySnapshot(@Args('input') input: AdminFindManySnapshotInput) {
    return this.service.admin.findManySnapshot(input)
  }

  @Query(() => Snapshot, { nullable: true })
  adminFindOneSnapshot(@Args('snapshotId') snapshotId: string) {
    return this.service.admin.findOneSnapshot(snapshotId)
  }
}
