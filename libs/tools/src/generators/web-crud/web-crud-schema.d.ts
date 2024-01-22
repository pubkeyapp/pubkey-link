export interface WebCrudGeneratorSchema {
  app: string
  actor: string
  label?: string
  model: string
}

export interface NormalizedWebCrudSchema extends WebCrudGeneratorSchema {
  label: string
  npmScope: string
  fields?: PrismaModelField[]
}
