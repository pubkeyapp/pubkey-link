import { names, readProjectConfiguration, Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { getImportPath } from '../utils/get-import-path'

export function getApiFeatureModuleInfo(tree: Tree, options: NormalizedApiFeatureSchema) {
  const project = readProjectConfiguration(tree, `${options.app}-${options.model}-feature`)

  const featureProjectRoot = project.sourceRoot
  const featureImportPath = getImportPath(tree, `${featureProjectRoot}/index.ts`)
  const featureModulePath = `${featureProjectRoot}/lib/${project.name}.module.ts`
  const featureModuleClassName = names(`${project.name}-module`).className

  return {
    featureImportPath,
    featureProjectRoot,
    featureModulePath,
    featureModuleClassName,
  }
}
