import { Model } from '@mrleebo/prisma-ast'
import { Tree } from '@nx/devkit'
import { getPrismaSchema } from './get-prisma-schema'

export function getPrismaModels(tree: Tree, schemaPath = 'prisma/schema.prisma'): Model[] {
  const schema = getPrismaSchema(tree, schemaPath)
  return schema.list.filter((item) => item.type === 'model') as Model[]
}
