import { Field, Model } from '@mrleebo/prisma-ast'
import { Tree } from '@nx/devkit'
import { getPrismaSchema } from './get-prisma-schema'

export function getPrismaModels(tree: Tree, schemaPath = 'prisma/schema.prisma'): Model[] {
  const schema = getPrismaSchema(tree, schemaPath)

  return schema.list.filter((item) => item.type === 'model') as Model[]
}

export interface PrismaModelField {
  name: string
  type: string
  optional: boolean
}

function getField(type: string) {
  switch (type) {
    case 'String':
      return 'string'
    case 'Int':
      return 'number'
    case 'Boolean':
      return 'boolean'
    case 'DateTime':
      return 'Date'
    default:
      return type
  }
}

export function getPrismaModelFields(tree: Tree, name: string): PrismaModelField[] {
  const model = getPrismaModels(tree).find((m) => m.name.toLowerCase() === name.toLowerCase())

  return model?.properties
    .filter((p) => p.type === 'field')
    .filter((p: Field) => !['id', 'createdAt', 'updatedAt'].includes(p.name))
    .map((p: Field) => ({
      name: p.name,
      type: getField(p.fieldType.toString()),
      optional: p.optional,
    }))
}
