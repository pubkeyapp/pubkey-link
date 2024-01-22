import { names, Tree } from '@nx/devkit'
import { PrismaSyncGeneratorSchema } from '../../generators/prisma-sync/prisma-sync-schema'
import { getPrismaEnums } from './get-prisma-enums'
import { getPrismaModels } from './get-prisma-models'
import { getProjectEntities, suffixEnum, suffixModel } from './get-project-entities'

export function syncPrismaEntities(tree: Tree, { app, verbose }: PrismaSyncGeneratorSchema) {
  // Get all the projects with entities
  const projects = getProjectEntities(tree, app)
  // Get a list of all the domains in the workspace
  const domains = projects.map((i) => i.domain)

  // Loop through all the enums in the prisma schema
  for (const prismaEnum of getPrismaEnums(tree)) {
    // Check if the enum exists in the workspace

    const found = projects
      // Loop through all the projects in the workspace and find the one that has the enum
      .find((entity) => entity.enums.find((entityEnum) => entityEnum === prismaEnum.name))

    if (found) {
      log(`SKIP: Enum ${prismaEnum.name} => found in project ${found.name}`)
      continue
    }

    const domain = domains.find((domain) => prismaEnum.name.toLowerCase().startsWith(domain.toLowerCase()))

    if (!domain) {
      log(`SKIP: Enum ${prismaEnum.name} => can't find domain`)
      continue
    }
    // Get the project to add the enum to
    const project = projects.find((project) => project.domain === domain)

    // Get the file name for the enum
    const filename = names(prismaEnum.name + suffixEnum).fileName

    // Get the target file path
    const file = `${project.entityRoot}/${filename}`

    // Get the template for the enum
    const content = getEnumTemplate(prismaEnum.name)

    tree.write(file, content)
    if (verbose) {
      log(`ADD Enum ${prismaEnum.name} to project ${project.name}`)
    }

    const exportLine = `export * from './lib/entity/${filename}'`.replace('.ts', '')
    const indexFile = `${project.root}/src/index.ts`
    const indexContent = tree.read(indexFile).toString()

    if (!indexContent.includes(exportLine)) {
      tree.write(indexFile, `${indexContent}\n${exportLine}`)
    }
  }

  // Loop through all the models in the prisma schema
  for (const prismaModel of getPrismaModels(tree)) {
    // Check if the model exists in the workspace
    const found = projects
      // Loop through all the projects in the workspace and find the one that has the model
      .find((entity) => entity.models.find((entityModel) => entityModel === prismaModel.name))

    if (found) {
      log(`SKIP: Model ${prismaModel.name} => found in project ${found.name}`)
      continue
    }

    const domain = domains.find((domain) => prismaModel.name.toLowerCase().startsWith(domain.toLowerCase()))

    if (!domain) {
      log(`SKIP: Model ${prismaModel.name} => can't find domain`)
      continue
    }

    // Get the project to add the model to
    const project = projects.find((project) => project.domain === domain)

    // Get the file name for the model
    const filename = names(prismaModel.name + suffixModel).fileName

    // Get the target file path
    const file = `${project.entityRoot}/${filename}`

    // Get the template for the model
    const content = getModelTemplate(prismaModel.name)

    tree.write(file, content)
    log(`ADD Model ${prismaModel.name} to project ${project.name}`)

    const exportLine = `export * from './lib/entity/${filename}'`.replace('.ts', '')
    const indexFile = `${project.root}/src/index.ts`
    const indexContent = tree.read(indexFile).toString()

    if (!indexContent.includes(exportLine)) {
      tree.write(indexFile, `${indexContent}\n${exportLine}`)
    }
  }

  function log(...args: string[]) {
    if (!verbose) return
    console.log(...args)
  }
}

function getEnumTemplate(name: string): string {
  return [
    `import { registerEnumType } from '@nestjs/graphql'`,
    `import { ${name} } from '@prisma/client'`,
    `export { ${name} }`,
    ``,
    `registerEnumType(${name}, { name: '${name}' })`,
  ].join('\n')
}

function getModelTemplate(name: string): string {
  return [
    `import { Field, HideField, ObjectType } from '@nestjs/graphql'`,
    ``,
    `@ObjectType()`,
    `export class ${name} {`,
    `@Field()`,
    `id!: string`,
    `@Field({ nullable: true })`,
    `createdAt?: Date`,
    `@Field({ nullable: true })`,
    `updatedAt?: Date`,
  ].join('\n')
}
