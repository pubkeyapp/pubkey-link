import { Prisma } from '@prisma/client'
import { AdminFindManyLogInput } from '../dto/admin-find-many-log.input'

export function getLogWhereAdminInput(input: AdminFindManyLogInput): Prisma.LogWhereInput {
  const where: Prisma.LogWhereInput = {
    communityId: input.communityId ?? undefined,
    level: input.level ?? undefined,
    relatedId: input.relatedId ?? undefined,
    relatedType: input.relatedType ?? undefined,
    identityProvider: input.identityProvider ?? undefined,
    identityProviderId: input.identityProviderId ?? undefined,
    botId: input.botId ?? undefined,
    roleId: input.roleId ?? undefined,
  }

  const OR: Prisma.LogWhereInput[] = []

  if (input.search) {
    OR.push(
      { id: { contains: input.search, mode: 'insensitive' } },
      { message: { contains: input.search, mode: 'insensitive' } },
    )
  }

  if (input.userId) {
    OR.push(
      // Either the user is the owner of the identity or the user is the owner of the log
      { userId: input.userId },
      { identity: { ownerId: input.userId } },
    )
  }

  return { ...where, OR: OR.length > 0 ? OR : undefined }
}
