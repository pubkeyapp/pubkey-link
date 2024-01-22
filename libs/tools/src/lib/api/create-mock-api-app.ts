import { getProjects, Tree } from '@nx/devkit'
import { applicationGenerator, libraryGenerator, serviceGenerator } from '@nx/nest'

export async function createMockApiApp(tree: Tree, app: string) {
  // Build the mock app and core libs
  await applicationGenerator(tree, {
    directory: `apps/${app}`,
    name: app,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
  })
  // Create the core data access lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/core/data-access`,
    name: `${app}-core-data-access`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
  })
  const p = getProjects(tree).get(`${app}-core-data-access`)
  // Create the core service
  await serviceGenerator(tree, {
    directory: `${p.sourceRoot}/lib`,
    name: `${app}-core`,
    nameAndDirectoryFormat: 'as-provided',
    skipFormat: true,
  })
  // Create the core feature lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/core/feature`,
    name: `${app}-core-feature`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
  })
  // Create the sdk lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/sdk`,
    name: `sdk`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
  })

  tree.write(
    'prisma/schema.prisma',
    `
  model User {
    id Int @id
  }
  model Company {
    id Int @id
    name String
    location String
    phone String?
  }
  `,
  )
}
