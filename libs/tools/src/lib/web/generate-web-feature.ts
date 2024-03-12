import { getProjects, Tree } from '@nx/devkit'
import webCrudGenerator from '../../generators/web-crud/web-crud-generator'
import { generateWebLib } from './generate-web-lib'
import { NormalizedWebFeatureSchema } from './normalized-web-feature-schema'

export async function generateWebFeature(tree: Tree, options: NormalizedWebFeatureSchema) {
  const projects = getProjects(tree)
  const [dataAccess, feature, ui] = [
    `${options.app}-${options.model}-data-access`,
    `${options.app}-${options.model}-feature`,
    `${options.app}-${options.model}-ui`,
  ].map((name) => projects.get(name))

  if (!options.skipDataAccess && !dataAccess) {
    await generateWebLib(tree, 'data-access', options)
  }
  if (!options.skipFeature && !feature) {
    await generateWebLib(tree, 'feature', options)
  }
  if (!options.skipUi && !ui) {
    await generateWebLib(tree, 'ui', options)
  }
  if (!options.skipDataAccess && !options.skipFeature && !options.skipUi && options.crud?.length) {
    for (const actor of options.crud) {
      await webCrudGenerator(tree, { actor, ...options })
    }
  }
}
