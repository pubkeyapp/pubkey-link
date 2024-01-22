import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { NormalizedWebFeatureSchema, WebFeatureGeneratorSchema } from '../../generators/web-feature/web-feature-schema'

export function normalizeWebFeatureSchema(tree: Tree, schema: WebFeatureGeneratorSchema): NormalizedWebFeatureSchema {
  const model = schema.model
  const npmScope = getNpmScope(tree)

  return {
    app: schema.app ?? 'web',
    label: schema.label ?? 'name',
    crud: schema.crud?.length ? schema.crud.split(',') : [],
    model,
    npmScope,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUi: schema.skipUi ?? false,
  }
}
