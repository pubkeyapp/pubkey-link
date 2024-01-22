import { names } from '@nx/devkit'
import * as pluralize from 'pluralize'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function getApiSubstitutions(options: NormalizedApiFeatureSchema) {
  const app = names(options.app)
  const model = names(options.model)
  const plural = names(pluralize.plural(options.model))

  return {
    app,
    appFileName: app.fileName,
    modelFileName: model.fileName,
    modelPropertyNamePlural: plural.propertyName,
    label: names(options.label),
    model,
    npmScope: options.npmScope,
  }
}
