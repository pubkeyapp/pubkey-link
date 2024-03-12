export interface NormalizedWebFeatureSchema {
  app: string
  crud: string[]
  label: string
  model: string
  npmScope: string
  skipDataAccess: boolean
  skipFeature: boolean
  skipUi: boolean
}
