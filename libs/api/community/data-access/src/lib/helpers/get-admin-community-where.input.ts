import { Prisma } from '@prisma/client'
import { AdminFindManyCommunityInput } from '../dto/admin-find-many-community.input'

export function getAdminCommunityWhereInput(input: AdminFindManyCommunityInput): Prisma.CommunityWhereInput {
  const where: Prisma.CommunityWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
