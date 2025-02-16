import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  AdminCreateAllocationInput,
  AdminFindManyAllocationInput,
  AdminUpdateAllocationInput,
  Allocation,
  AllocationPaging,
  ApiAllocationService,
} from '@pubkey-link/api-allocation-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { GraphQLJSON } from 'graphql-scalars'

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

  @Mutation(() => GraphQLJSON, { nullable: true })
  adminCheckAllocation(
    @Args('allocationId') allocationId: string,
    @Args({ name: 'address', type: () => [String] }) address: string[],
  ) {
    return this.service.admin.checkAllocation(allocationId, address)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminGetAllocationSnapshots(@Args('allocationId') allocationId: string) {
    return this.service.admin.getAllocationSnapshots(allocationId)
  }
}
