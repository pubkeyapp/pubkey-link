import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApiApp } from '../../lib/api/create-mock-api-app'
import { ApiFeatureGeneratorSchema } from '../api-feature/api-feature-schema'

import { apiE2eGenerator } from './api-e2e-generator'

describe('api-e2e generator', () => {
  let tree: Tree
  const options: ApiFeatureGeneratorSchema = { app: 'api', name: 'test', label: 'name', skipSdk: true }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await createMockApiApp(tree, options.app)
    await apiE2eGenerator(tree, options)

    const basePathE2e = `apps/${options.app}-e2e/src`
    const files = [
      // Generated test
      `${basePathE2e}/api/api-${options.name}-feature.spec.ts`,
    ]

    files.forEach((file) => {
      expect(tree.exists(file)).toBeTruthy()
      expect(tree.read(file).toString()).toMatchSnapshot()
    })
  })
})
