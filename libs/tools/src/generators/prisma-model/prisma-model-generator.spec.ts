import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'

import { createMockPrismaSchema } from '../../lib/prisma/create-mock-prisma-schema'
import { getPrismaModels } from '../../lib/prisma/get-prisma-models'
import { normalizePrismaModelSchema } from '../../lib/prisma/normalize-prisma-model-schema'

import { prismaModelGenerator } from './prisma-model-generator'
import { PrismaModelGeneratorSchema } from './prisma-model-schema'

describe('prisma-model generator', () => {
  let tree: Tree
  const options: PrismaModelGeneratorSchema = { name: 'test' }
  const normalizedOptions = normalizePrismaModelSchema(options)

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
    createMockPrismaSchema(tree)
  })

  it('should add a model to the schema', async () => {
    const modelsBefore = getPrismaModels(tree)
    await prismaModelGenerator(tree, options)

    const modelsAfter = getPrismaModels(tree)

    expect(modelsBefore.length).toBe(2)
    expect(modelsAfter.length).toBe(3)
    expect(modelsAfter.find((m) => m.name === normalizedOptions.name)).toBeTruthy()
  })

  it('should not create a model if it already exists', async () => {
    const options: PrismaModelGeneratorSchema = { name: 'User' }
    expect.assertions(1)

    try {
      await prismaModelGenerator(tree, options)
    } catch (error) {
      expect(error.message).toBe(`Model "${options.name}" already exists`)
    }
  })
})
