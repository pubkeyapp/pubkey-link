import { formatFiles, Tree } from '@nx/devkit'
import { generateApiCrud } from '../../lib/api-crud/generate-api-crud'
import { normalizeApiCrudSchema } from '../../lib/api-crud/normalize-api-crud-schema'
import { ensureNxProjectExists } from '../../lib/utils/ensure-nx-project-exists'
import { ApiCrudGeneratorSchema } from './api-crud-schema'

export async function apiCrudGenerator(tree: Tree, rawOptions: ApiCrudGeneratorSchema) {
  const options = normalizeApiCrudSchema(tree, rawOptions)
  ensureNxProjectExists(tree, options.app)
  generateApiCrud(tree, options)
  await formatFiles(tree)
}

export default apiCrudGenerator
