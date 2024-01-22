import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'

import { renameGenerator } from './rename-generator'
import { RenameGeneratorSchema } from './rename-schema'

describe('rename generator', () => {
  let tree: Tree
  const options: RenameGeneratorSchema = { search: 'proj', replace: 'new-name', dryRun: false, quiet: true }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should add tests ', async () => {
    await renameGenerator(tree, options)
    const npmScope = getNpmScope(tree)
    expect(npmScope).toEqual(options.replace)
  })
})
