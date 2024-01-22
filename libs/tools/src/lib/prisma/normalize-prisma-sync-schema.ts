import { PrismaSyncGeneratorSchema } from '../../generators/prisma-sync/prisma-sync-schema'

export function normalizePrismaSyncSchema(schema: PrismaSyncGeneratorSchema): PrismaSyncGeneratorSchema {
  return {
    app: schema.app ?? 'api',
    schemaFile: schema.schemaFile ?? 'prisma/schema.prisma',
    verbose: schema.verbose ?? false,
  }
}
