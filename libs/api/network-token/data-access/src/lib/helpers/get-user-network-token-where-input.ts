import { Prisma } from '@prisma/client'
import { UserFindManyNetworkTokenInput } from '../dto/user-find-many-network-token.input'

export function getUserNetworkTokenWhereInput(
  filters: string[] = [],
  input: UserFindManyNetworkTokenInput,
): Prisma.NetworkTokenWhereInput {
  const where: Prisma.NetworkTokenWhereInput = {
    cluster: input.cluster,
    type: input.type ?? undefined,
  }

  if (filters.length) {
    where.account = { in: filters }
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
