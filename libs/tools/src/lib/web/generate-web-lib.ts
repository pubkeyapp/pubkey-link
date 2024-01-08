import { Tree } from '@nx/devkit'
import { Linter } from '@nx/eslint'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { libraryGenerator } from '@nx/react'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { WebLibType } from '../types/web-feature'
import { generateWebLibDataAccess } from './generate-web-lib-data-access'
import { generateWebLibFeature } from './generate-web-lib-feature'
import { generateWebLibUi } from './generate-web-lib-ui'

export async function generateWebLib(tree: Tree, type: WebLibType, options: NormalizedWebFeatureSchema) {
  const generated = await libraryGenerator(tree, {
    name: `${options.app}-${options.name}-${type}`,
    projectNameAndRootFormat: 'as-provided',
    directory: `libs/${options.app}/${options.name}/${type}`,
    tags: `app:${options.app},type:${type}`,
    skipFormat: true,
    linter: Linter.EsLint,
    style: 'css',
  })
  if (!generated) {
    throw new Error(`Failed to generate ${type} library`)
  }
  const npmScope = getNpmScope(tree)

  if (!npmScope) {
    throw new Error('Could not find npmScope.')
  }

  switch (type) {
    case 'data-access':
      await generateWebLibDataAccess(tree, options, npmScope)
      break
    case 'feature':
      await generateWebLibFeature(tree, options, npmScope)
      break
    case 'ui':
      await generateWebLibUi(tree, options, npmScope)
      break
  }

  return generated
}
