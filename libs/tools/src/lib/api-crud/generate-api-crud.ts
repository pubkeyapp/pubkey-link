import { generateFiles, getProjects, type ProjectConfiguration, Tree } from '@nx/devkit'
import type { NormalizedApiCrudSchema } from '../../generators/api-crud/api-crud-schema'
import { addExports } from '../utils/add-export'
import { ensureNxProjectExists } from '../utils/ensure-nx-project-exists'
import { addServiceToClassConstructor } from './add-service-to-class-constructor'
import { addServiceToModuleDecorator } from './add-service-to-module-decorator'
import { generateSdkFile } from './generate-sdk-file'
import { getApiCrudSubstitutions } from './get-api-crud-substitutions'

export function generateApiCrud(tree: Tree, options: NormalizedApiCrudSchema) {
  const [dataAccess, feature]: ProjectConfiguration[] = [
    `${options.app}-${options.model}-data-access`,
    `${options.app}-${options.model}-feature`,
  ].map((project) => ensureNxProjectExists(tree, project))
  const vars = getApiCrudSubstitutions(options)

  const serviceName = `${vars.app.className}${vars.actor.className}${vars.model.className}Service`
  const serviceFileName = `${vars.appFileName}-${vars.actorFileName}-${vars.modelFileName}.service.ts`
  const resolverName = `${vars.app.className}${vars.actor.className}${vars.model.className}Resolver`
  const resolverFileName = `${vars.appFileName}-${vars.actorFileName}-${vars.modelFileName}.resolver.ts`

  const requiredFields = [
    `${dataAccess.sourceRoot}/lib/${vars.appFileName}-${vars.modelFileName}.service.ts`,
    `${dataAccess.sourceRoot}/lib/${vars.appFileName}-${vars.modelFileName}-data-access.module.ts`,
    `${feature.sourceRoot}/lib/${vars.appFileName}-${vars.modelFileName}-feature.module.ts`,
  ]

  for (const field of requiredFields) {
    if (!tree.exists(field)) {
      throw new Error(`Required file not found: ${field}`)
    }
  }

  const entityFile = `${dataAccess.sourceRoot}/lib/entity/${vars.modelFileName}.entity.ts`
  if (!tree.exists(entityFile)) {
    // Create the entity file
    generateFiles(tree, `${__dirname}/files/entity`, dataAccess.sourceRoot, { ...vars })
  }

  const [dataAccessServicePath, dataAccessModulePath, featureModulePath] = requiredFields

  const dataAccessExports: string[] = [
    // Add exports here
    `./lib/dto/${vars.actorFileName}-create-${vars.modelFileName}.input`,
    `./lib/dto/${vars.actorFileName}-find-many-${vars.modelFileName}.input`,
    `./lib/dto/${vars.actorFileName}-update-${vars.modelFileName}.input`,
    `./lib/entity/${vars.modelFileName}-paging.entity`,
  ]

  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/data-access`, dataAccess.sourceRoot, { ...vars })

  // Add the crud service to the service constructor
  addServiceToClassConstructor(
    tree,
    dataAccessServicePath,
    `${vars.app.className}${vars.model.className}Service`,
    vars.actor.propertyName,
    serviceName,
    serviceFileName,
  )
  // Add the crud service to the module providers
  addServiceToModuleDecorator(tree, dataAccessModulePath, serviceName, serviceFileName)
  // Add the crud service to the module resolvers
  addServiceToModuleDecorator(tree, featureModulePath, resolverName, resolverFileName)

  // Add the exports to the barrel file
  addExports(tree, `${dataAccess.sourceRoot}/index.ts`, dataAccessExports)

  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/feature`, feature.sourceRoot, { ...vars })

  // Generate the SDK file
  generateSdkFile(
    tree,
    options,
    options.fields?.map((f) => f.name.toString()),
  )

  const e2e = getProjects(tree).get(`${options.app}-e2e`)
  if (!e2e) {
    return
  }
  const e2eFile = `${e2e.root}/src/api/${vars.appFileName}-${vars.modelFileName}-${vars.actorFileName}-feature.spec.ts`

  if (!tree.exists(e2eFile)) {
    generateFiles(tree, `${__dirname}/files/e2e`, `${e2e.root}/src/api`, { ...vars })
  }
}
