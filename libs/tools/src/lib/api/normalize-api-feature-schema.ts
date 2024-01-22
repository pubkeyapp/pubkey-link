import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { ApiFeatureGeneratorSchema, NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function normalizeApiFeatureSchema(tree: Tree, schema: ApiFeatureGeneratorSchema): NormalizedApiFeatureSchema {
  const model = schema.model
  const npmScope = getNpmScope(tree)

  return {
    app: schema.app ?? 'api',
    label: schema.label ?? 'name',
    crud: schema.crud?.length ? schema.crud.split(',') : [],
    model,
    npmScope,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUtil: schema.skipUtil ?? true,
  }
}
