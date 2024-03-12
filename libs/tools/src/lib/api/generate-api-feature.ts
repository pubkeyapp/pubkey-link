import { getProjects, Tree } from '@nx/devkit'
import apiCrudGenerator from '../../generators/api-crud/api-crud-generator'

import { generateApiLib } from './generate-api-lib'
import { NormalizedApiFeatureSchema } from './normalized-api-feature-schema'

export async function generateApiFeature(tree: Tree, options: NormalizedApiFeatureSchema) {
  const projects = getProjects(tree)
  const [dataAccess, feature, util] = [
    `${options.app}-${options.model}-data-access`,
    `${options.app}-${options.model}-feature`,
    `${options.app}-${options.model}-util`,
  ].map((name) => projects.get(name))

  if (!options.skipDataAccess && !dataAccess) {
    await generateApiLib(tree, 'data-access', options)
  }
  if (!options.skipFeature && !feature) {
    await generateApiLib(tree, 'feature', options)
  }
  if (!options.skipUtil && !util) {
    await generateApiLib(tree, 'util', options)
  }
  if (!options.skipDataAccess && !options.skipFeature && options.crud?.length) {
    for (const actor of options.crud) {
      await apiCrudGenerator(tree, { actor, ...options })
    }
  }
}
