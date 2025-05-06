import { Prisma } from '@prisma/client'
import { AdminFindManyResolverInput } from '../dto/admin-find-many-resolver.input'

export function getResolverWhereAdminInput(input: AdminFindManyResolverInput): Prisma.ResolverWhereInput {
  const where: Prisma.ResolverWhereInput = { cluster: input.cluster }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
