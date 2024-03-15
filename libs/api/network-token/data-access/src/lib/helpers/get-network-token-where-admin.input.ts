import { Prisma } from '@prisma/client'
import { AdminFindManyNetworkTokenInput } from '../dto/admin-find-many-network-token.input'

export function getNetworkTokenWhereAdminInput(input: AdminFindManyNetworkTokenInput): Prisma.NetworkTokenWhereInput {
  const where: Prisma.NetworkTokenWhereInput = {
    cluster: input.cluster,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
