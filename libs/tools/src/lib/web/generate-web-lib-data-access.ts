import { generateFiles, Tree } from '@nx/devkit'
import { join } from 'node:path'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { addExports } from '../utils/add-export'
import { getWebModuleInfo } from './get-web-module-info'

export async function generateWebLibDataAccess(tree: Tree, options: NormalizedWebFeatureSchema, npmScope: string) {
  const { project, barrel, className, fileName, propertyName } = getWebModuleInfo(
    tree,
    options.app,
    'data-access',
    options.name,
    options.modelName,
  )

  if (!options.skipAdminCrud) {
    generateFiles(tree, join(__dirname, './files/data-access'), project.sourceRoot, {
      app: options.app,
      label: options.label,
      modelClassName: className,
      modelFileName: fileName,
      modelPropertyName: propertyName,
      npmScope,
    })
    addExports(tree, barrel, [
      // Export the admin hooks
      `./lib/use-admin-find-many-${options.name}`,
      `./lib/use-admin-find-one-${options.name}`,
    ])
  }
}
