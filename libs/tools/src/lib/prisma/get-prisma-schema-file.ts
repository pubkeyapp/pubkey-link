import { Tree } from '@nx/devkit'

export function getPrismaSchemaFile(tree: Tree, schemaPath = 'prisma/schema.prisma'): string {
  return tree.read(schemaPath)?.toString('utf-8')
}
