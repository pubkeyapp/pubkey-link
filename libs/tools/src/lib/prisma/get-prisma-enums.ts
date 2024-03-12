import { Enum } from '@mrleebo/prisma-ast'
import { Tree } from '@nx/devkit'
import { getPrismaSchema } from './get-prisma-schema'

export function getPrismaEnums(tree: Tree, schemaPath = 'prisma/schema.prisma'): Enum[] {
  const schema = getPrismaSchema(tree, schemaPath)

  return schema.list.filter((item) => item.type === 'enum') as Enum[]
}
