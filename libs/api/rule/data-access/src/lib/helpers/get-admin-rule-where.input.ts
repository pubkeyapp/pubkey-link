import { Prisma } from '@prisma/client'
import { AdminFindManyRuleInput } from '../dto/admin-find-many-rule.input'

export function getAdminRuleWhereInput(input: AdminFindManyRuleInput): Prisma.RuleWhereInput {
  const where: Prisma.RuleWhereInput = {
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
