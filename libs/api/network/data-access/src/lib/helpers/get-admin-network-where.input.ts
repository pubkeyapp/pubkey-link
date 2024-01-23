import { Prisma } from '@prisma/client'
import { AdminFindManyNetworkInput } from '../dto/admin-find-many-network.input'

export function getAdminNetworkWhereInput(input: AdminFindManyNetworkInput): Prisma.NetworkWhereInput {
  const where: Prisma.NetworkWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
