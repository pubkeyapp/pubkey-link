import { formatFiles, Tree } from '@nx/devkit'
import { ensureNxProjectExists } from '../../lib/utils/ensure-nx-project-exists'
import { generateWebCrud } from '../../lib/web-crud/generate-web-crud'
import { normalizeWebCrudSchema } from '../../lib/web-crud/normalize-web-crud-schema'
import { WebCrudGeneratorSchema } from './web-crud-schema'

export async function webCrudGenerator(tree: Tree, rawOptions: WebCrudGeneratorSchema) {
  const options = normalizeWebCrudSchema(tree, rawOptions)
  ensureNxProjectExists(tree, options.app)
  generateWebCrud(tree, options)
  await formatFiles(tree)
}

export default webCrudGenerator
