import { Prisma } from '@prisma/client'
import { UserFindManyAppUserInput } from '../dto/user-find-many-app-user.input'

export function getUserAppUserWhereInput(input: UserFindManyAppUserInput): Prisma.AppUserWhereInput {
  const where: Prisma.AppUserWhereInput = {
    appId: input.appId,
  }

  if (input.search) {
    where.OR = [{ id: { contains: input.search, mode: 'insensitive' } }, { role: { equals: input.role } }]
  }

  return where
}
