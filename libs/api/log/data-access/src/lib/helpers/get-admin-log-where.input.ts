import { Prisma } from '@prisma/client'
import { AdminFindManyLogInput } from '../dto/admin-find-many-log.input'

export function getAdminLogWhereInput(input: AdminFindManyLogInput): Prisma.LogWhereInput {
  const where: Prisma.LogWhereInput = {
    communityId: input.communityId,
  }

  if (input.level) {
    where.level = input.level
  }
  if (input.relatedId) {
    where.relatedId = input.relatedId
  }
  if (input.relatedType) {
    where.relatedType = input.relatedType
  }
  if (input.identityProvider) {
    where.identityProvider = input.identityProvider
  }
  if (input.identityProviderId) {
    where.identityProviderId = input.identityProviderId
  }
  if (input.botId) {
    where.botId = input.botId
  }
  if (input.userId) {
    where.userId = input.userId
  }
  if (input.ruleId) {
    where.ruleId = input.ruleId
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { message: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
