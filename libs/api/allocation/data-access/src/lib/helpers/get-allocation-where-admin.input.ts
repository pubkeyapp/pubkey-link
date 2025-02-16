import { Prisma } from '@prisma/client'
import { AdminFindManyAllocationInput } from '../dto/admin-find-many-allocation.input'

export function getAllocationWhereAdminInput(input: AdminFindManyAllocationInput): Prisma.AllocationWhereInput {
  const where: Prisma.AllocationWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
