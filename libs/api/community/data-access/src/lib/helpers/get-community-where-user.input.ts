import { Prisma, User, UserRole } from '@prisma/client'

import { UserFindManyCommunityInput } from '../dto/user-find-many-community.input'

export function getCommunityWhereUserInput(user: User, input: UserFindManyCommunityInput): Prisma.CommunityWhereInput {
  const where: Prisma.CommunityWhereInput = {}

  if (user.role !== UserRole.Admin) {
    where.members = { some: { userId: user.id } }
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
