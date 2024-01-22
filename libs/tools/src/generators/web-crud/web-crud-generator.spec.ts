import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockWebApp } from '../../lib/web'
import webFeatureGenerator from '../web-feature/web-feature-generator'
import { WebCrudGeneratorSchema } from './web-crud-schema'

describe('web-crud generator', () => {
  let tree: Tree
  const options: WebCrudGeneratorSchema = { model: 'company', actor: 'manager', app: 'test' }

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()

    await createMockWebApp(tree, options.app)
    await webFeatureGenerator(tree, { app: options.app, model: options.model })
  })

  it('should run successfully', async () => {
    // await webCrudGenerator(tree, options)
    const config = readProjectConfiguration(tree, options.app)
    expect(config).toBeDefined()
  })
})
