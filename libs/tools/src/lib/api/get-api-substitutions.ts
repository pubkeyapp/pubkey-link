import { names } from '@nx/devkit'
import * as pluralize from 'pluralize'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function getApiSubstitutions(options: NormalizedApiFeatureSchema) {
  const admin = names('admin')
  const model = names(options.modelName)
  const plural = names(pluralize.plural(options.modelName))
  const user = names('user')

  return {
    admin,
    adminCrud: !options.skipAdminCrud,
    adminFileName: admin.fileName,
    modelFileName: model.fileName,
    modelPropertyNamePlural: plural.propertyName,
    app: names(options.app),
    label: names(options.label),
    model,
    npmScope: options.npmScope,
    user,
    // FIXME: Support user crud
    userCrud: false,
  }
}
