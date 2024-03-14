import { Prisma } from '@prisma/client'
import { UserFindManyRoleInput } from '../dto/user-find-many-role.input'

export function getRoleWhereUserInput(input: UserFindManyRoleInput): Prisma.RoleWhereInput {
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
