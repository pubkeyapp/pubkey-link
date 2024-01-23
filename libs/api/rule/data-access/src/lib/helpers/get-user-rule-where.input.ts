import { Prisma } from '@prisma/client'
import { UserFindManyRuleInput } from '../dto/user-find-many-rule.input'

export function getUserRuleWhereInput(input: UserFindManyRuleInput): Prisma.RuleWhereInput {
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
