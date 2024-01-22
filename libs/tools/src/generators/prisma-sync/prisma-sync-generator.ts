import { Tree } from '@nx/devkit'
import { normalizePrismaSyncSchema } from '../../lib/prisma/normalize-prisma-sync-schema'
import { syncPrismaEntities } from '../../lib/prisma/sync-prisma-entities'
import { PrismaSyncGeneratorSchema } from './prisma-sync-schema'

export async function prismaSyncGenerator(tree: Tree, rawOptions: PrismaSyncGeneratorSchema) {
  const options = normalizePrismaSyncSchema(rawOptions)
  const prisma = tree.exists(options.schemaFile)
  if (!prisma) {
    throw new Error('Prisma schema not found')
  }

  syncPrismaEntities(tree, options)
}

export default prismaSyncGenerator
