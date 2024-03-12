import { ApiCrudGeneratorSchema } from '../../generators/api-crud/api-crud-schema'

export interface NormalizedApiCrudSchema extends ApiCrudGeneratorSchema {
  label: string
  npmScope: string
  fields?: PrismaModelField[]
}
