import { formatFiles, Tree } from '@nx/devkit'
import { ensureNxProjectExists } from '../../lib/utils/ensure-nx-project-exists'
import { generateWebFeature, normalizeWebFeatureSchema } from '../../lib/web'
import { WebFeatureGeneratorSchema } from './web-feature-schema'

export async function webFeatureGenerator(tree: Tree, rawOptions: WebFeatureGeneratorSchema) {
  const options = normalizeWebFeatureSchema(tree, rawOptions)
  ensureNxProjectExists(tree, options.app)
  await generateWebFeature(tree, options)
  await formatFiles(tree)
}

export default webFeatureGenerator
