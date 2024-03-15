import { Prisma } from '@prisma/client'
import { UserFindManySnapshotInput } from '../dto/user-find-many-snapshot.input'

export function getSnapshotWhereUserInput(input: UserFindManySnapshotInput): Prisma.SnapshotWhereInput {
  const where: Prisma.SnapshotWhereInput = {
    role: {
      id: input.roleId ?? undefined,
      communityId: input.communityId,
    },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
