import { Tree } from '@nx/devkit'
import { generateApiE2e } from '../../lib/api-e2e/generate-api-e2e'
import { normalizeApiFeatureSchema } from '../../lib/api/normalize-api-feature-schema'
import { ensureNxProjectExists } from '../../lib/utils/ensure-nx-project-exists'
import { ApiFeatureGeneratorSchema } from '../api-feature/api-feature-schema'

export async function apiE2eGenerator(tree: Tree, rawOptions: ApiFeatureGeneratorSchema) {
  const options = normalizeApiFeatureSchema(tree, rawOptions)
  ensureNxProjectExists(tree, options.app)

  await generateApiE2e(tree, options)
}

export default apiE2eGenerator
