import { Prisma } from '@prisma/client'
import { AdminFindManyAppInput } from '../dto/admin-find-many-app.input'

export function getAdminAppWhereInput(input: AdminFindManyAppInput): Prisma.AppWhereInput {
  const where: Prisma.AppWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
