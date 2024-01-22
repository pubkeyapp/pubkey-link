export interface ApiCrudGeneratorSchema {
  app: string
  actor: string
  label?: string
  model: string
}

export interface NormalizedApiCrudSchema extends ApiCrudGeneratorSchema {
  label: string
  npmScope: string
  fields?: PrismaModelField[]
}
