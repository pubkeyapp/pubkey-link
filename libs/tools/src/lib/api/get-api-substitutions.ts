import { names } from '@nx/devkit'
import * as pluralize from 'pluralize'
import { NormalizedApiFeatureSchema } from './normalized-api-feature-schema'

export function getApiSubstitutions(options: NormalizedApiFeatureSchema) {
  const app = names(options.app)
  const model = names(options.model)
  const plural = names(pluralize.plural(options.model))

  return {
    app,
    appFileName: app.fileName,
    modelFileName: model.fileName,
    modelPropertyNamePlural: plural.propertyName,
    parent: options.modelParent ? names(options.modelParent) : undefined,
    parentId: options.modelParentId,
    parentPropertyId: options.modelParentId?.replace('Id', ''),
    label: names(options.label),
    model,
    npmScope: options.npmScope,
  }
}
