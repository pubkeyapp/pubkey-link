export type WebFeatureGeneratorSchema = Partial<NormalizedWebFeatureSchema>

export interface NormalizedWebFeatureSchema {
  app: string
  name: string
  label: string
  modelName: string
  npmScope: string
  skipAdminCrud: boolean
  skipDataAccess: boolean
  skipFeature: boolean
  skipUi: boolean
}
