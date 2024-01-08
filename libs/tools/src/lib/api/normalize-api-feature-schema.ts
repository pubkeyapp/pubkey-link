import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { ApiFeatureGeneratorSchema, NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function normalizeApiFeatureSchema(tree: Tree, schema: ApiFeatureGeneratorSchema): NormalizedApiFeatureSchema {
  const modelName = schema.name
  const npmScope = getNpmScope(tree)

  return {
    app: schema.app ?? 'api',
    name: schema.name,
    label: schema.label ?? 'name',
    modelName,
    npmScope,
    skipAdminCrud: schema.skipAdminCrud ?? false,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipE2e: schema.skipE2e ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipSdk: schema.skipSdk ?? false,
    skipUtil: schema.skipUtil ?? true,
  }
}
