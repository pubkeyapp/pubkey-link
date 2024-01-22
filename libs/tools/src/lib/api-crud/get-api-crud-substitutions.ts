import { names } from '@nx/devkit'
import * as pluralize from 'pluralize'
import type { NormalizedApiCrudSchema } from '../../generators/api-crud/api-crud-schema'

export function getApiCrudSubstitutions(options: NormalizedApiCrudSchema) {
  const actor = names(options.actor)
  const app = names(options.app)
  const model = names(options.model)

  return {
    actor,
    actorFileName: actor.fileName,
    app,
    appFileName: app.fileName,
    fields: options.fields,
    label: names(options.label),
    model,
    modelFileName: model.fileName,
    modelPropertyNamePlural: names(pluralize.plural(options.model)).propertyName,
    npmScope: options.npmScope,
  }
}
