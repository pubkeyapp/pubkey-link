import { formatFiles, Tree } from '@nx/devkit'
import { generateApiE2e } from '../../lib/api-e2e/generate-api-e2e'
import { generateApiFeature } from '../../lib/api/generate-api-feature'
import { normalizeApiFeatureSchema } from '../../lib/api/normalize-api-feature-schema'
import { ensureNxProjectExists } from '../../lib/utils/ensure-nx-project-exists'
import { ApiFeatureGeneratorSchema } from './api-feature-schema'

export async function apiFeatureGenerator(tree: Tree, rawOptions: ApiFeatureGeneratorSchema) {
  const options = normalizeApiFeatureSchema(tree, rawOptions)
  ensureNxProjectExists(tree, options.app)
  await generateApiFeature(tree, options)
  if (!options.skipE2e) {
    await generateApiE2e(tree, options)
  }
  await formatFiles(tree)
}

export default apiFeatureGenerator
