import { Prisma } from '@prisma/client'
import { UserFindManyLogInput } from '../dto/user-find-many-log.input'

export function getUserLogWhereInput(input: UserFindManyLogInput): Prisma.LogWhereInput {
  const where: Prisma.LogWhereInput = {
    communityId: input.communityId ?? undefined,
    networkAssetId: input.networkAssetId ?? undefined,
    level: input.level ?? undefined,
    relatedId: input.relatedId ?? undefined,
    relatedType: input.relatedType ?? undefined,
    identityProvider: input.identityProvider ?? undefined,
    identityProviderId: input.identityProviderId ?? undefined,
    botId: input.botId ?? undefined,
    userId: input.userId ?? undefined,
    roleId: input.roleId ?? undefined,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { message: { contains: input.search, mode: 'insensitive' } },
      { identityProviderId: { contains: input.search, mode: 'insensitive' } },
      { user: { username: { contains: input.search, mode: 'insensitive' } } },
    ]
  }

  return where
}
