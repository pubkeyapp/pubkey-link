import { generateFiles, Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { addExports } from '../utils/add-export'
import { ensureNxProjectExists } from '../utils/ensure-nx-project-exists'
import { getApiSubstitutions } from './get-api-substitutions'

export async function generateApiLibDataAccess(tree: Tree, options: NormalizedApiFeatureSchema) {
  const substitutions = getApiSubstitutions(options)

  const [dataAccess] = [`${options.app}-${options.model}-data-access`].map((project) =>
    ensureNxProjectExists(tree, project),
  )

  // Remove the generated data access module
  tree.delete(`${dataAccess.sourceRoot}/lib/${dataAccess.name}.module.ts`)
  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/data-access`, dataAccess.sourceRoot, { ...substitutions })
  // Add the exports to the barrel file
  addExports(tree, `${dataAccess.sourceRoot}/index.ts`, [
    `./lib/${options.app}-${options.model}.service`,
    `./lib/entity/${substitutions.model.fileName}.entity`,
  ])
}
