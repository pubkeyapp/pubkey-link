import { getSchema, Schema } from '@mrleebo/prisma-ast'
import { Tree } from '@nx/devkit'
import { getPrismaSchemaFile } from './get-prisma-schema-file'

export function getPrismaSchema(tree: Tree, schemaPath = 'prisma/schema.prisma'): Schema {
  return getSchema(getPrismaSchemaFile(tree, schemaPath))
}
