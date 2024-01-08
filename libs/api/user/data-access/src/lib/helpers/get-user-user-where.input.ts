import { Prisma } from '@prisma/client'
import { UserFindManyUserInput } from '../dto/user-find-many-user.input'

export function getUserUserWhereInput(input: UserFindManyUserInput): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { username: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
