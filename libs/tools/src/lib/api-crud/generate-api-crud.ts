import { generateFiles, getProjects, type ProjectConfiguration, Tree } from '@nx/devkit'
import { addExports } from '../utils/add-export'
import { ensureNxProjectExists } from '../utils/ensure-nx-project-exists'
import { addServiceToClassConstructor } from './add-service-to-class-constructor'
import { addServiceToModuleDecorator } from './add-service-to-module-decorator'
import { generateSdkFile } from './generate-sdk-file'
import { getApiCrudSubstitutions } from './get-api-crud-substitutions'

import { NormalizedApiCrudSchema } from './normalized-api-crud.schema'

export function generateApiCrud(tree: Tree, options: NormalizedApiCrudSchema) {
  const [dataAccess, feature]: ProjectConfiguration[] = [
    `${options.app}-${options.model}-data-access`,
    `${options.app}-${options.model}-feature`,
  ].map((project) => ensureNxProjectExists(tree, project))
  const vars = getApiCrudSubstitutions(options)

  const serviceName = `${vars.app.className}${vars.model.className}DataService`
  const serviceFileName = `${vars.appFileName}-${vars.modelFileName}-data.service.ts`
  const serviceActorName = `${vars.app.className}${vars.model.className}Data${vars.actor.className}Service`
  const serviceActorFileName = `${vars.appFileName}-${vars.modelFileName}-data-${vars.actorFileName}.service.ts`
  const resolverName = `${vars.app.className}${vars.model.className}${vars.actor.className}Resolver`
  const resolverFileName = `${vars.appFileName}-${vars.modelFileName}-${vars.actorFileName}.resolver.ts`

  const requiredFields = [
    `${dataAccess.sourceRoot}/lib/${vars.appFileName}-${vars.modelFileName}.service.ts`,
    `${dataAccess.sourceRoot}/lib/${vars.appFileName}-${vars.modelFileName}.data-access.module.ts`,
    `${feature.sourceRoot}/lib/${vars.appFileName}-${vars.modelFileName}.feature.module.ts`,
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

  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/data-access`, dataAccess.sourceRoot, { ...vars })

  // Add the services to the service constructor

  const currentFile = tree.read(dataAccessServicePath).toString()
  if (!currentFile.includes(serviceName)) {
    addServiceToClassConstructor(
      tree,
      dataAccessServicePath,
      `${vars.app.className}${vars.model.className}Service`,
      'data',
      serviceName,
      serviceFileName,
    )
    addServiceToModuleDecorator(tree, dataAccessModulePath, serviceName, serviceFileName)
  }

  addServiceToClassConstructor(
    tree,
    dataAccessServicePath,
    `${vars.app.className}${vars.model.className}Service`,
    vars.actor.propertyName,
    serviceActorName,
    serviceActorFileName,
  )
  // Add the crud service to the module providers
  addServiceToModuleDecorator(tree, dataAccessModulePath, serviceActorName, serviceActorFileName)
  // Add the crud service to the module resolvers
  addServiceToModuleDecorator(tree, featureModulePath, resolverName, resolverFileName)

  const dataAccessExports: string[] = [
    // Add exports here
    `./lib/entity/${vars.model.fileName}.entity`,
    `./lib/dto/${vars.actorFileName}-create-${vars.modelFileName}.input`,
    `./lib/dto/${vars.actorFileName}-find-many-${vars.modelFileName}.input`,
    `./lib/dto/${vars.actorFileName}-update-${vars.modelFileName}.input`,
  ]

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
