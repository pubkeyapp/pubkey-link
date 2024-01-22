export type ApiFeatureGeneratorSchema = Partial<Omit<NormalizedApiFeatureSchema, 'crud'>> & {
  crud?: string
  model: string
}

export interface NormalizedApiFeatureSchema {
  app: string
  crud: string[]
  label: string
  model: string
  npmScope: string
  skipDataAccess: boolean
  skipFeature: boolean
  skipUtil: boolean
}
