import { generateFiles, type ProjectConfiguration, Tree } from '@nx/devkit'

import { NormalizedApiCrudSchema } from '../api-crud/normalized-api-crud.schema'
import { addArrayItem } from '../utils/add-array-item'
import { addExports } from '../utils/add-export'
import { addNamedImport } from '../utils/add-named-import'
import { ensureNxProjectExists } from '../utils/ensure-nx-project-exists'
import { updateSourceFile } from '../utils/update-source-file'
import { getWebCrudSubstitutions } from './get-web-crud-substitutions'

const defaultIconMap: Record<string, string> = {
  App: 'IconApps',
  Category: 'IconCategory',
  Company: 'IconBuilding',
  Integration: 'IconPuzzle',
  Network: 'IconNetwork',
  Project: 'IconProject',
  Server: 'IconServer',
  Tag: 'IconTag',
  User: 'IconUser',
}

function getDefaultIcon(className: string) {
  return defaultIconMap[className] || 'IconSettings'
}

export function generateWebCrud(tree: Tree, options: NormalizedApiCrudSchema) {
  const vars = getWebCrudSubstitutions(options)
  const projects: ProjectConfiguration[] = [
    `${vars.app.fileName}-${vars.model.fileName}-data-access`,
    `${vars.app.fileName}-${vars.model.fileName}-feature`,
    `${vars.app.fileName}-${vars.model.fileName}-ui`,
    `${vars.app.fileName}-core-feature`,
  ].map((project) => ensureNxProjectExists(tree, project))

  const [dataAccess, feature, ui, shellFeature] = projects

  const requiredFiles = [
    `${shellFeature.sourceRoot}/lib/${options.app}-core-routes-${vars.actor.fileName}.tsx`,
    `${shellFeature.sourceRoot}/lib/${options.app}-core-routes-${vars.actor.fileName}.tsx`,
    `${feature.sourceRoot}/index.ts`,
  ]
  for (const file of requiredFiles) {
    if (!tree.exists(file)) {
      throw new Error(`Required file not found: ${file}`)
    }
  }

  const [adminRoutes, userRoutes, featureIndex] = requiredFiles

  const routesFile = vars.actorAdmin ? adminRoutes : userRoutes

  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/data-access`, dataAccess.sourceRoot, { ...vars })

  // Add the exports to the barrel file
  addExports(tree, `${dataAccess.sourceRoot}/index.ts`, [
    `./lib/use-${vars.actor.fileName}-find-many-${vars.model.fileName}`,
    `./lib/use-${vars.actor.fileName}-find-one-${vars.model.fileName}`,
  ])

  // Generate the feature library
  generateFiles(tree, `${__dirname}/files/feature`, feature.sourceRoot, { ...vars })

  const imports = [
    `export const ${vars.actor.className}${vars.model.className}Feature = lazy(() => import('./lib/${vars.actor.fileName}-${vars.model.fileName}.routes'))`,
  ]

  const importSnippet = `import { lazy } from 'react'`
  // Check if the featureIndex file already has the above import featureIndex
  if (!tree.read(featureIndex).toString().includes(importSnippet)) {
    imports.unshift(importSnippet)
  }

  // Add the imports to the featureIndex file
  const indexContent = tree.read(featureIndex)
  tree.write(featureIndex, [indexContent, ...imports].join('\n'))

  const defaultIcon = getDefaultIcon(vars.model.className)
  const routesFileContent = tree.read(routesFile).toString()
  if (!routesFileContent.includes(defaultIcon)) {
    tree.write(routesFile, [`import { ${defaultIcon} } from '@tabler/icons-react'`, routesFileContent].join('\n'))
  }

  const to = `${vars.actorAdmin ? '/admin/' : `/`}${vars.plural.fileName}`
  const link = {
    name: 'links',
    content: `{ label: '${vars.plural.className}', icon: ${defaultIcon}, to: '${to}' },`,
  }
  const route = {
    name: 'routes',
    content: `{ path: '/${vars.plural.fileName}/*', element: <${vars.actor.className}${vars.model.className}Feature /> },`,
  }

  updateSourceFile(tree, routesFile, (source) => {
    addArrayItem(source, link)
    addArrayItem(source, route)
    return source
  })

  updateSourceFile(tree, routesFile, (source) => {
    addNamedImport(
      source,
      `@${vars.npmScope}/${vars.app.fileName}-${vars.model.fileName}-feature`,
      `${vars.actor.className}${vars.model.className}Feature`,
    )
    return source
  })

  // Generate the ui library
  generateFiles(tree, `${__dirname}/files/ui`, ui.sourceRoot, { ...vars })

  // Add the exports to the barrel file
  addExports(tree, `${ui.sourceRoot}/index.ts`, [
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-create-form`,
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-table`,
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-update-form`,
    `./lib/${vars.model.fileName}-ui-avatar`,
    `./lib/${vars.model.fileName}-ui-grid`,
    `./lib/${vars.model.fileName}-ui-grid-item`,
    `./lib/${vars.model.fileName}-ui-info`,
    `./lib/${vars.model.fileName}-ui-item`,
  ])
}
