import { readProjectConfiguration, Tree } from '@nx/devkit'

export function ensureNxProjectExists(tree: Tree, name: string) {
  if (!name) {
    throw new Error(`Project name is required`)
  }

  const config = readProjectConfiguration(tree, name)

  if (!config) {
    throw new Error(`Project "${name}" does not exist`)
  }
  return config
}
