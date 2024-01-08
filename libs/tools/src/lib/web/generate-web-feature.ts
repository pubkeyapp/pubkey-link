import { Tree } from '@nx/devkit'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { generateWebLib } from './generate-web-lib'

export async function generateWebFeature(tree: Tree, options: NormalizedWebFeatureSchema) {
  // FIXME: Make sure we can run this feature twice. If the libraries already exist we should skip them
  if (!options.skipDataAccess) {
    await generateWebLib(tree, 'data-access', options)
  }
  if (!options.skipFeature) {
    await generateWebLib(tree, 'feature', options)
  }
  if (!options.skipUi) {
    await generateWebLib(tree, 'ui', options)
  }
}
