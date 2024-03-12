import { WebCrudGeneratorSchema } from '../../generators/web-crud/web-crud-schema'
import { PrismaModelField } from '../prisma/get-prisma-models'

export interface NormalizedWebCrudGeneratorSchema extends WebCrudGeneratorSchema {
  label: string
  npmScope: string
  fields?: PrismaModelField[]
}
