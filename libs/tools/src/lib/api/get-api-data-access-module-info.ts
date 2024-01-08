import { readProjectConfiguration, Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function getApiDataAccessModuleInfo(tree: Tree, options: NormalizedApiFeatureSchema) {
  const project = readProjectConfiguration(tree, `${options.app}-${options.name}-data-access`)

  const dataAccessProjectRoot = project.sourceRoot
  const dataAccessModulePath = `${dataAccessProjectRoot}/lib/${project.name}.module.ts`

  return {
    dataAccessProjectRoot,
    dataAccessModulePath,
  }
}
