import { Prisma } from '@prisma/client'
import { AdminFindManyAppBotInput } from '../dto/admin-find-many-app-bot.input'

export function getAdminAppBotWhereInput(input: AdminFindManyAppBotInput): Prisma.AppBotWhereInput {
  const where: Prisma.AppBotWhereInput = {
    appId: input.appId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
