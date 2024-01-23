import { Prisma } from '@prisma/client'
import { AdminFindManyBotInput } from '../dto/admin-find-many-bot.input'

export function getAdminBotWhereInput(input: AdminFindManyBotInput): Prisma.BotWhereInput {
  const where: Prisma.BotWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
