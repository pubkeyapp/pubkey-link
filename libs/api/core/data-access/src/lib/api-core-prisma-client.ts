import { PrismaClient } from '@prisma/client'
import { pagination } from 'prisma-extension-pagination'

export const prismaClient = new PrismaClient().$extends(
  pagination({
    pages: {
      includePageCount: true,
      limit: 10,
    },
  }),
)

export type ApiCorePrismaClient = typeof prismaClient
