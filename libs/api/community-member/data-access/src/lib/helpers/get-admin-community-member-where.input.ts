import { Prisma } from '@prisma/client'
import { AdminFindManyCommunityMemberInput } from '../dto/admin-find-many-community-member.input'

export function getAdminCommunityMemberWhereInput(
  input: AdminFindManyCommunityMemberInput,
): Prisma.CommunityMemberWhereInput {
  const where: Prisma.CommunityMemberWhereInput = {
    communityId: input.communityId,
  }
  if (input.role) {
    where.role = input.role
  }
  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { user: { id: { contains: input.search, mode: 'insensitive' } } },
      { user: { name: { contains: input.search, mode: 'insensitive' } } },
      { user: { username: { contains: input.search, mode: 'insensitive' } } },
    ]
  }

  return where
}
