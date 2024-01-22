import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { normalizePrismaSyncSchema } from '../../lib/prisma/normalize-prisma-sync-schema'

import { prismaSyncGenerator } from './prisma-sync-generator'
import { PrismaSyncGeneratorSchema } from './prisma-sync-schema'

describe('prisma-sync generator', () => {
  let tree: Tree
  const options: PrismaSyncGeneratorSchema = normalizePrismaSyncSchema({ app: 'test' })

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    tree.write('prisma/schema.prisma', '')
    await prismaSyncGenerator(tree, options)
  })
})
