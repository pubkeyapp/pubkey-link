import { Tree } from '@nx/devkit'
import { addPrismaModel } from '../../lib/prisma/create-mock-prisma-schema'

import { getPrismaModels } from '../../lib/prisma/get-prisma-models'
import { normalizePrismaModelSchema } from '../../lib/prisma/normalize-prisma-model-schema'
import { PrismaModelGeneratorSchema } from './prisma-model-schema'

export async function prismaModelGenerator(tree: Tree, rawOptions: PrismaModelGeneratorSchema) {
  const options = normalizePrismaModelSchema(rawOptions)
  const prisma = tree.exists(options.schemaFile)
  if (!prisma) {
    throw new Error('Prisma schema not found')
  }

  const models = getPrismaModels(tree)
  const exists = models.find((m) => m.name === options.name)
  if (exists) {
    throw new Error(`Model "${options.name}" already exists`)
  }

  const schema = tree.read(options.schemaFile).toString('utf-8')
  // Add the model to the schema
  const updated = addPrismaModel(schema, options.name, options.label, options.fields)

  // Write the schema back to the file
  tree.write(options.schemaFile, updated)
}

export default prismaModelGenerator
