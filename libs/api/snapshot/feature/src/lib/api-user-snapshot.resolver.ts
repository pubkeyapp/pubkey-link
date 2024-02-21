import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiSnapshotService,
  Snapshot,
  SnapshotPaging,
  UserCreateSnapshotInput,
  UserFindManySnapshotInput,
} from '@pubkey-link/api-snapshot-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserSnapshotResolver {
  constructor(private readonly service: ApiSnapshotService) {}

  @Mutation(() => Snapshot, { nullable: true })
  userCreateSnapshot(@CtxUserId() userId: string, @Args('input') input: UserCreateSnapshotInput) {
    return this.service.user.createSnapshot(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteSnapshot(@CtxUserId() userId: string, @Args('snapshotId') snapshotId: string) {
    return this.service.user.deleteSnapshot(userId, snapshotId)
  }

  @Query(() => SnapshotPaging)
  userFindManySnapshot(@CtxUserId() userId: string, @Args('input') input: UserFindManySnapshotInput) {
    return this.service.user.findManySnapshot(userId, input)
  }

  @Query(() => Snapshot, { nullable: true })
  userFindOneSnapshot(@CtxUserId() userId: string, @Args('snapshotId') snapshotId: string) {
    return this.service.user.findOneSnapshot(userId, snapshotId)
  }
}
