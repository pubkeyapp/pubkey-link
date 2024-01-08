import { generateFiles, names, Tree } from '@nx/devkit'
import { join } from 'node:path'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { addExports } from '../utils/add-export'
import { getWebModuleInfo } from './get-web-module-info'

export async function generateWebLibUi(tree: Tree, options: NormalizedWebFeatureSchema, npmScope: string) {
  const { project, barrel, className, fileName, propertyName, propertyNamePlural } = getWebModuleInfo(
    tree,
    options.app,
    'ui',
    options.name,
    options.modelName,
  )

  if (!options.skipAdminCrud) {
    generateFiles(tree, join(__dirname, './files/ui'), project.sourceRoot, {
      app: options.app,
      label: options.label,
      labelClassName: names(options.label).className,
      modelClassName: className,
      modelFileName: fileName,
      modelPropertyName: propertyName,
      modelPropertyNamePlural: propertyNamePlural,
      npmScope,
    })
    addExports(tree, barrel, [
      // Export the admin hooks
      `./lib/admin-${options.name}-ui-create-form`,
      `./lib/admin-${options.name}-ui-table`,
      `./lib/admin-${options.name}-ui-update-form`,
    ])
  }
}
