import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { NormalizedWebFeatureSchema, WebFeatureGeneratorSchema } from '../../generators/web-feature/web-feature-schema'

export function normalizeWebFeatureSchema(tree: Tree, schema: WebFeatureGeneratorSchema): NormalizedWebFeatureSchema {
  const modelName = schema.name
  const npmScope = getNpmScope(tree)

  return {
    app: schema.app ?? 'web',
    name: schema.name,
    label: schema.label ?? 'name',
    modelName,
    npmScope,
    skipAdminCrud: schema.skipAdminCrud ?? false,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUi: schema.skipUi ?? false,
  }
}
