import { CommunityRole, Prisma } from '@prisma/client'
import { UserFindManyTeamInput } from '../dto/user-find-many-team.input'

export function getTeamWhereUserInput(userId: string, input: UserFindManyTeamInput): Prisma.TeamWhereInput {
  const where: Prisma.TeamWhereInput = { communityId: input.communityId }

  where.OR = [
    { ownerId: userId },
    { members: { some: { userId } } },
    { community: { members: { some: { userId, role: CommunityRole.Admin } } } },
  ]

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
