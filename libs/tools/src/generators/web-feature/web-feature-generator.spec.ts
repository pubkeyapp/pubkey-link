import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApiApp } from '../../lib/api/create-mock-api-app'

import { getRecursiveFileNames } from '../../lib/utils/get-recursive-file-names'
import { createMockWebApp, normalizeWebFeatureSchema } from '../../lib/web'
import apiFeatureGenerator from '../api-feature/api-feature-generator'

import { webFeatureGenerator } from './web-feature-generator'
import { type NormalizedWebFeatureSchema, WebFeatureGeneratorSchema } from './web-feature-schema'

describe('web-feature generator', () => {
  let tree: Tree
  const rawOptions: WebFeatureGeneratorSchema = { app: 'web', model: 'test' }
  let options: NormalizedWebFeatureSchema

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()
    options = normalizeWebFeatureSchema(tree, rawOptions)
    await createMockApiApp(tree, 'api')
    await apiFeatureGenerator(tree, { app: 'api', crud: 'admin,user', model: 'company' })
    await createMockWebApp(tree, options.app)
  })

  it('should run successfully', async () => {
    await webFeatureGenerator(tree, rawOptions)

    const basePathDataAccess = `libs/${options.app}/${options.model}/data-access/src`
    const basePathFeature = `libs/${options.app}/${options.model}/feature/src`
    const basePathUi = `libs/${options.app}/${options.model}/ui/src`

    const sourceFilesDataAccess = getRecursiveFileNames({ tree, path: basePathDataAccess })
    const sourceFilesFeature = getRecursiveFileNames({ tree, path: basePathFeature })
    const sourceFilesUi = getRecursiveFileNames({ tree, path: basePathUi })

    expect(sourceFilesDataAccess).toMatchInlineSnapshot(`
      [
        "libs/web/test/data-access/src/index.ts",
      ]
    `)
    expect(sourceFilesFeature).toMatchInlineSnapshot(`
      [
        "libs/web/test/feature/src/index.ts",
      ]
    `)
    expect(sourceFilesUi).toMatchInlineSnapshot(`
      [
        "libs/web/test/ui/src/index.ts",
      ]
    `)

    const files = [...sourceFilesDataAccess, ...sourceFilesFeature, ...sourceFilesUi]

    files.forEach((file) => {
      expect(tree.exists(file)).toBeTruthy()
      expect(tree.read(file).toString()).toMatchSnapshot()
    })
  })

  it('should run successfully with crud', async () => {
    await webFeatureGenerator(tree, { ...options, crud: 'admin,user' })

    const basePathDataAccess = `libs/${options.app}/${options.model}/data-access/src`
    const basePathFeature = `libs/${options.app}/${options.model}/feature/src`
    const basePathUi = `libs/${options.app}/${options.model}/ui/src`

    const sourceFilesDataAccess = getRecursiveFileNames({ tree, path: basePathDataAccess })
    const sourceFilesFeature = getRecursiveFileNames({ tree, path: basePathFeature })
    const sourceFilesUi = getRecursiveFileNames({ tree, path: basePathUi })

    expect(sourceFilesDataAccess).toMatchInlineSnapshot(`
      [
        "libs/web/test/data-access/src/index.ts",
        "libs/web/test/data-access/src/lib/use-admin-find-many-test.ts",
        "libs/web/test/data-access/src/lib/use-admin-find-one-test.ts",
        "libs/web/test/data-access/src/lib/use-user-find-many-test.ts",
        "libs/web/test/data-access/src/lib/use-user-find-one-test.ts",
      ]
    `)
    expect(sourceFilesFeature).toMatchInlineSnapshot(`
      [
        "libs/web/test/feature/src/index.ts",
        "libs/web/test/feature/src/lib/admin-test-create.feature.tsx",
        "libs/web/test/feature/src/lib/admin-test-detail-overview.tab.tsx",
        "libs/web/test/feature/src/lib/admin-test-detail-settings.tab.tsx",
        "libs/web/test/feature/src/lib/admin-test-detail.feature.tsx",
        "libs/web/test/feature/src/lib/admin-test-list.feature.tsx",
        "libs/web/test/feature/src/lib/admin-test.routes.tsx",
        "libs/web/test/feature/src/lib/user-test-create.feature.tsx",
        "libs/web/test/feature/src/lib/user-test-detail-overview.tab.tsx",
        "libs/web/test/feature/src/lib/user-test-detail-settings.tab.tsx",
        "libs/web/test/feature/src/lib/user-test-detail.feature.tsx",
        "libs/web/test/feature/src/lib/user-test-list.feature.tsx",
        "libs/web/test/feature/src/lib/user-test.routes.tsx",
      ]
    `)
    expect(sourceFilesUi).toMatchInlineSnapshot(`
      [
        "libs/web/test/ui/src/index.ts",
        "libs/web/test/ui/src/lib/admin-test-ui-create-form.tsx",
        "libs/web/test/ui/src/lib/admin-test-ui-table.tsx",
        "libs/web/test/ui/src/lib/admin-test-ui-update-form.tsx",
        "libs/web/test/ui/src/lib/test-ui-avatar.tsx",
        "libs/web/test/ui/src/lib/test-ui-grid-item.tsx",
        "libs/web/test/ui/src/lib/test-ui-grid.tsx",
        "libs/web/test/ui/src/lib/test-ui-item.tsx",
        "libs/web/test/ui/src/lib/user-test-ui-create-form.tsx",
        "libs/web/test/ui/src/lib/user-test-ui-table.tsx",
        "libs/web/test/ui/src/lib/user-test-ui-update-form.tsx",
      ]
    `)

    const files = [...sourceFilesDataAccess, ...sourceFilesFeature, ...sourceFilesUi]

    files.forEach((file) => {
      expect(tree.exists(file)).toBeTruthy()
      expect(tree.read(file).toString()).toMatchSnapshot()
    })
  })
})
