import { Tree } from '@nx/devkit'

/**
 * Method to get the import path of a library from the tsconfig.base.json
 */
export function getImportPath(tree: Tree, path: string) {
  const tsConfigBase = tree.read('tsconfig.base.json')
  if (!tsConfigBase) {
    throw new Error('tsconfig.base.json not found')
  }
  const compilerOptions = JSON.parse(tsConfigBase.toString()).compilerOptions
  if (!compilerOptions) {
    throw new Error('tsconfig.base.json compilerOptions not found')
  }
  const paths = compilerOptions.paths
  if (!paths) {
    throw new Error('tsconfig.base.json compilerOptions.paths not found')
  }

  const found = Object.keys(paths).find((key) => paths[key].includes(path))
  if (!found) {
    throw new Error(`tsconfig.base.json compilerOptions.paths.${path} not found`)
  }

  return found
}
