import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockWebApp } from '../../lib/web/create-mock-web-app'

import { webFeatureGenerator } from './web-feature-generator'
import { WebFeatureGeneratorSchema } from './web-feature-schema'

describe('web-feature generator', () => {
  let tree: Tree
  const rawOptions: WebFeatureGeneratorSchema = { app: 'web', name: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await createMockWebApp(tree, rawOptions.app)
    await webFeatureGenerator(tree, rawOptions)

    expect(true).toBeTruthy()
  })
})
