import { Prisma } from '@prisma/client'
import { AdminFindManyRoleInput } from '../dto/admin-find-many-role.input'

export function getAdminRoleWhereInput(input: AdminFindManyRoleInput): Prisma.RoleWhereInput {
  const where: Prisma.RoleWhereInput = {
    communityId: input.communityId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
