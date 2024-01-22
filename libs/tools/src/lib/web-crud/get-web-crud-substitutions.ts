import { names } from '@nx/devkit'
import * as pluralize from 'pluralize'
import type { NormalizedApiCrudSchema } from '../../generators/api-crud/api-crud-schema'

export function getWebCrudSubstitutions(options: NormalizedApiCrudSchema) {
  const actor = names(options.actor)
  const app = names(options.app)
  const model = names(options.model)
  const plural = names(pluralize.plural(options.model))

  return {
    actor,
    actorAdmin: actor.className === 'Admin',
    actorFileName: actor.fileName,
    app,
    appFileName: app.fileName,
    fields: options.fields,
    label: names(options.label),
    model,
    modelFileName: model.fileName,
    modelPropertyNamePlural: plural.propertyName,
    npmScope: options.npmScope,
    plural,
  }
}
