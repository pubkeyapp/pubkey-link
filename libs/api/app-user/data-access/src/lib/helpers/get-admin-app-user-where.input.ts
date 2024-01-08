import { Prisma } from '@prisma/client'
import { AdminFindManyAppUserInput } from '../dto/admin-find-many-app-user.input'

export function getAdminAppUserWhereInput(input: AdminFindManyAppUserInput): Prisma.AppUserWhereInput {
  const where: Prisma.AppUserWhereInput = {
    appId: input.appId,
  }

  if (input.search) {
    where.OR = [{ id: { contains: input.search, mode: 'insensitive' } }, { role: { equals: input.role } }]
  }

  return where
}
