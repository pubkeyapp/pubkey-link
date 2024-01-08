import { readProjectConfiguration, Tree } from '@nx/devkit'
import { WebLibType } from '../types/web-feature'
import { getImportPath } from '../utils/get-import-path'

export function getWebLib(tree: Tree, app: string, name: string, type: WebLibType) {
  const project = readProjectConfiguration(tree, `${app}-${name}-${type}`)
  const importPath = getImportPath(tree, `${project.sourceRoot}/index.ts`)

  return { importPath, project }
}
