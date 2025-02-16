import { Resolver } from '@nestjs/graphql'
import { ApiAllocationService } from '@pubkey-link/api-allocation-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAllocationInput,
  AdminFindManyAllocationInput,
  Allocation,
  AllocationPaging,
  AdminUpdateAllocationInput,
} from '@pubkey-link/api-allocation-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAllocationAdminResolver {
  constructor(private readonly service: ApiAllocationService) {}

  @Mutation(() => Allocation, { nullable: true })
  adminCreateAllocation(@Args('input') input: AdminCreateAllocationInput) {
    return this.service.admin.createAllocation(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteAllocation(@Args('allocationId') allocationId: string) {
    return this.service.admin.deleteAllocation(allocationId)
  }

  @Query(() => AllocationPaging)
  adminFindManyAllocation(@Args('input') input: AdminFindManyAllocationInput) {
    return this.service.admin.findManyAllocation(input)
  }

  @Query(() => Allocation, { nullable: true })
  adminFindOneAllocation(@Args('allocationId') allocationId: string) {
    return this.service.admin.findOneAllocation(allocationId)
  }

  @Mutation(() => Allocation, { nullable: true })
  adminUpdateAllocation(@Args('allocationId') allocationId: string, @Args('input') input: AdminUpdateAllocationInput) {
    return this.service.admin.updateAllocation(allocationId, input)
  }
}
