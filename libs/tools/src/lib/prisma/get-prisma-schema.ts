import { getSchema, Schema } from '@mrleebo/prisma-ast'
import { Tree } from '@nx/devkit'

export function getPrismaSchema(tree: Tree, schemaPath: string): Schema {
  const source = tree.read(schemaPath).toString('utf-8')
  return getSchema(source)
}
