import { Prisma } from '@prisma/client'
import { AdminFindManyTeamInput } from '../dto/admin-find-many-team.input'

export function getTeamWhereAdminInput(input: AdminFindManyTeamInput): Prisma.TeamWhereInput {
  const where: Prisma.TeamWhereInput = { communityId: input.communityId }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
