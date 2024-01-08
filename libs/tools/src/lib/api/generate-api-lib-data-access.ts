import { generateFiles, Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { addExports } from '../utils/add-export'
import { getApiDataAccessModuleInfo } from './get-api-data-access-module-info'
import { getApiSubstitutions } from './get-api-substitutions'

export async function generateApiLibDataAccess(tree: Tree, options: NormalizedApiFeatureSchema) {
  const substitutions = getApiSubstitutions(options)

  const { dataAccessModulePath, dataAccessProjectRoot } = getApiDataAccessModuleInfo(tree, options)

  const dataAccessExports: string[] = [
    `./lib/${options.app}-${options.name}.service`,
    `./lib/entity/${substitutions.model.fileName}.entity`,
    `./lib/entity/${substitutions.model.fileName}-paging.entity`,
  ]

  if (!options.skipAdminCrud) {
    dataAccessExports.push(
      `./lib/dto/admin-create-${substitutions.model.fileName}.input`,
      `./lib/dto/admin-find-many-${substitutions.model.fileName}.input`,
      `./lib/dto/admin-update-${substitutions.model.fileName}.input`,
    )
  }

  // Remove the generated data access module
  tree.delete(dataAccessModulePath)
  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/data-access`, dataAccessProjectRoot, { ...substitutions })
  // Add the exports to the barrel file
  addExports(tree, `${dataAccessProjectRoot}/index.ts`, dataAccessExports)
}
