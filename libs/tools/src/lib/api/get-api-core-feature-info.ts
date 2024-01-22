import { readProjectConfiguration, Tree } from '@nx/devkit'

export function getApiCoreFeatureInfo(tree: Tree, app: string) {
  const project = readProjectConfiguration(tree, `${app}-core-feature`)

  const coreFeatureModulePath = `${project.sourceRoot}/lib/${project.name}.module.ts`

  if (!tree.exists(coreFeatureModulePath)) {
    throw new Error(`getApiCoreFeatureInfo: ${coreFeatureModulePath} does not exist in ${project.sourceRoot}`)
  }

  return { coreFeatureModulePath }
}
