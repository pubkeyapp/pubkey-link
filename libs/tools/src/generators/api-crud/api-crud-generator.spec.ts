import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApiApp } from '../../lib/api/create-mock-api-app'
import { getRecursiveFileContents } from '../../lib/utils/get-recursive-file-contents'
import apiFeatureGenerator from '../api-feature/api-feature-generator'
import apiCrudGenerator from './api-crud-generator'
import { ApiCrudGeneratorSchema } from './api-crud-schema'

describe('api-crud generator', () => {
  let tree: Tree
  const options: ApiCrudGeneratorSchema = { app: 'test', actor: 'admin', model: 'company' }

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()
    await createMockApiApp(tree, options.app)
    await apiFeatureGenerator(tree, { app: options.app, model: options.model })
  })

  it('should run successfully', async () => {
    await apiCrudGenerator(tree, options)
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()

    const contents = getRecursiveFileContents({
      tree,
      path: 'libs/test',
    })
    expect(contents).toMatchSnapshot()
  })
})
