import { getProjects, names, Tree } from '@nx/devkit'
import { getDomainFromProjectName } from './get-domain-from-project-name'

export const suffixEnum = '.enum.ts'
export const suffixModel = '.entity.ts'
const filterModels = ['app-config', 'paging-meta', 'paging-response', '-paging']

// Get an array of all the data-access projects with their entity folder and entities
export function getProjectEntities(tree: Tree, app: string) {
  // Get an array of all the projects
  const projects = Array.from(getProjects(tree).values())

  // The path to the entity folder inside a data-access project
  const entityPath = 'src/lib/entity'

  // Get an array of all the data-access projects with their entity folder
  return (
    projects
      // Filter to only include data-access projects
      .filter((project) => project.name.includes('data-access'))
      // Map the root path to the entity folder path
      .map(({ name, root }) => ({
        name,
        root,
        entityRoot: `${root}/${entityPath}`,
        domain: getDomainFromProjectName(root, app),
      }))
      // Filter to only include projects that have an entity folder
      .filter((root) => tree.exists(root.entityRoot))
      .map((project) => ({
        ...project,
        enums: getProjectEnums(tree, project.entityRoot),
        models: getProjectModels(tree, project.entityRoot),
      }))
      // Filter out projects that don't have models or enums
      .filter((project) => project.enums.length > 0 || project.models.length > 0)
  )
}

// Get an array of all the enums in the entity folder
function getProjectEnums(tree: Tree, entityRoot: string) {
  return (
    tree
      // Get all the files in the entity folder
      .children(entityRoot)
      // Filter to only include files that match the enum suffix
      .filter((item) => item.endsWith(suffixEnum))
      // Remove the suffix from the file name
      .map((item) => item.replace(`${suffixEnum}`, ''))
      // Convert the file name to the class name
      .map((item) => names(item).className)
  )
}

// Get an array of all the models in the entity folder
function getProjectModels(tree: Tree, entityRoot: string) {
  return (
    tree
      // Get all the files in the entity folder
      .children(entityRoot)
      // Filter to only include files that match the model suffix
      .filter((child) => child.endsWith(suffixModel))
      // Filter to remove the -paging.${suffixModel} files
      .filter((child) => !filterModels.some((filter) => child.includes(filter)))
      // Remove the suffix from the file name
      .map((child) => child.replace(`${suffixModel}`, ''))
      // Convert the file name to the class name
      .map((child) => names(child).className)
  )
}
