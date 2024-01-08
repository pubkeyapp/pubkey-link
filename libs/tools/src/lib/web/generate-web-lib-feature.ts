import { generateFiles, readProjectConfiguration, Tree } from '@nx/devkit'
import { join } from 'node:path'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { addArrayItem } from '../utils/add-array-item'
import { addNamedImport } from '../utils/add-named-import'
import { updateSourceFile } from '../utils/update-source-file'
import { getWebModuleInfo } from './get-web-module-info'

export async function generateWebLibFeature(tree: Tree, options: NormalizedWebFeatureSchema, npmScope: string) {
  const { project, barrel, className, classNamePlural, fileName, fileNamePlural, propertyName, propertyNamePlural } =
    getWebModuleInfo(tree, options.app, 'feature', options.name, options.modelName)

  if (!options.skipAdminCrud) {
    generateFiles(tree, join(__dirname, './files/feature'), project.sourceRoot, {
      app: options.app,
      label: options.label,
      modelClassName: className,
      modelClassNamePlural: classNamePlural,
      modelFileName: fileName,
      modelFileNamePlural: fileNamePlural,
      modelPropertyName: propertyName,
      modelPropertyNamePlural: propertyNamePlural,
      npmScope,
    })

    tree.write(
      barrel,
      `import { lazy } from 'react'

export const Admin${className}Feature = lazy(() => import('./lib/admin-${fileName}-feature'))
`,
    )

    const shellProject = readProjectConfiguration(tree, `${options.app}-shell-feature`)
    if (!shellProject) {
      throw new Error(`Could not find shell project for ${options.app}`)
    }

    const adminRoutes = `${shellProject.sourceRoot}/lib/shell-admin-routes.tsx`

    updateSourceFile(tree, adminRoutes, (source) => {
      addArrayItem(source, {
        name: 'links',
        content: `{ label: '${classNamePlural}', icon: IconUsers, to: '/admin/${fileNamePlural}' },`,
      })
      addArrayItem(source, {
        name: 'routes',
        content: `{ path: '${fileNamePlural}/*', element: <Admin${className}Feature /> },`,
      })
      return source
    })

    updateSourceFile(tree, adminRoutes, (source) => {
      addNamedImport(source, `@${npmScope}/${options.app}-${options.name}-feature`, `Admin${className}Feature`)
      return source
    })
  }
}
