import { names } from '@nx/devkit'
import { PrismaModelGeneratorSchema } from '../../generators/prisma-model/prisma-model-schema'

export function normalizePrismaModelSchema(schema: PrismaModelGeneratorSchema): PrismaModelGeneratorSchema {
  return {
    name: names(schema.name).className,
    fields: schema.fields ?? [],
    label: names((schema.label ?? 'name').toLowerCase()).propertyName,
    schemaFile: schema.schemaFile ?? 'prisma/schema.prisma',
  }
}
