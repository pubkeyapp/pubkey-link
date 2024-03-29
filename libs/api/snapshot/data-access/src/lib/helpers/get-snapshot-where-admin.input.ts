import { Prisma } from '@prisma/client'
import { AdminFindManySnapshotInput } from '../dto/admin-find-many-snapshot.input'

export function getSnapshotWhereAdminInput(input: AdminFindManySnapshotInput): Prisma.SnapshotWhereInput {
  const where: Prisma.SnapshotWhereInput = {
    role: {
      id: input.roleId ?? undefined,
      communityId: input.communityId,
    },
  }

  if (input.communityId) {
    where.role = { communityId: input.communityId }
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
