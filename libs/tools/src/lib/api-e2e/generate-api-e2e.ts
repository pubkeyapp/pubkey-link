import { generateFiles, Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { getApiSubstitutions } from '../api/get-api-substitutions'

export async function generateApiE2e(tree: Tree, options: NormalizedApiFeatureSchema) {
  const substitutions = getApiSubstitutions(options)
  generateFiles(tree, `${__dirname}/files`, `apps/${options.app}-e2e/src/api/`, { ...substitutions })

  return true
}
