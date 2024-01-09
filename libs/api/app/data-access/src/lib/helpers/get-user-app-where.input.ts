import { Prisma } from '@prisma/client'
import { UserFindManyAppInput } from '../dto/user-find-many-app.input'

export function getUserAppWhereInput(userId: string, input: UserFindManyAppInput): Prisma.AppWhereInput {
  const where: Prisma.AppWhereInput = {
    users: { some: { OR: [{ userId }] } },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
