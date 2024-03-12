import { names, readProjectConfiguration, Tree } from '@nx/devkit'
import { getImportPath } from '../utils/get-import-path'
import { NormalizedApiFeatureSchema } from './normalized-api-feature-schema'

export function getApiFeatureModuleInfo(tree: Tree, options: NormalizedApiFeatureSchema) {
  const project = readProjectConfiguration(tree, `${options.app}-${options.model}-feature`)

  const featureProjectRoot = project.sourceRoot
  const featureImportPath = getImportPath(tree, `${featureProjectRoot}/index.ts`)
  const featureModulePath = `${featureProjectRoot}/lib/${project.name}.module.ts`
  const featureModuleClassName = names(`${project.name}.module`).className

  return {
    featureImportPath,
    featureProjectRoot,
    featureModulePath,
    featureModuleClassName,
  }
}
