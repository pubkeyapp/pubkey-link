import { Prisma } from '@prisma/client'
import { AdminFindManyNetworkAssetInput } from '../dto/admin-find-many-network-asset.input'

export function getAdminNetworkAssetWhereInput(input: AdminFindManyNetworkAssetInput): Prisma.NetworkAssetWhereInput {
  const where: Prisma.NetworkAssetWhereInput = {
    cluster: input.cluster,
    type: input.type ?? undefined,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { account: { contains: input.search, mode: 'insensitive' } },
      { owner: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
