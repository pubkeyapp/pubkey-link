import { confirm, intro, log, outro, text } from '@clack/prompts'
import { Tree } from '@nx/devkit'
import { RenameGeneratorSchema } from './rename-schema'
import { flattenTreeSummary, TreeSummaryFile, treeWalker } from './tree-walker'

export interface RenamePair {
  search: string
  replace: string
}

export async function renameGenerator(tree: Tree, options: RenameGeneratorSchema) {
  const search = options.search.toString()
  intro(`Renaming the project from ${search}/${toPackageName(search)}`)

  if (!options.replace) {
    if (options.quiet) {
      throw new Error('Silent mode requires a replace value')
    }
    const replace = await promptReplace({ search })
    options.replace = replace.toString()
  }

  log.info(`Replacing ${search} => ${options.replace}`)
  log.info(`Replacing ${toPackageName(search)} => ${toPackageName(options.replace)}`)

  if (!options.quiet) {
    if (!(await promptConfirm())) {
      log.warning('Aborting...')
      return
    }
  }

  const pairs: RenamePair[] = [
    { search: search, replace: options.replace },
    { search: toPackageName(search), replace: toPackageName(options.replace) },
  ]

  const files = flattenTreeSummary(
    treeWalker({
      tree,
      filters: pairs.map((p) => p.search),
      path: '.',
    }),
  )

  for (const file of Object.keys(files)) {
    const content = (files[file] as TreeSummaryFile)?.contents

    if (!content) {
      log.warning(`  - File ${file} has no content to replace`)
      continue
    }

    if (options.dryRun === false) {
      const updated = updateContent({ content, pairs })
      tree.write(file, updated)
    } else {
      log.info(`  - File ${file} replaced contents (dry run)`)
    }
  }
  outro('We are done!')
}

export default renameGenerator

function toPackageName(name: string) {
  return name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
}

function updateContent({ content, pairs }: { content: string; pairs: RenamePair[] }) {
  return pairs.reduce((acc, { search, replace }) => acc.replace(new RegExp(search, 'g'), replace), content)
}

async function promptReplace({ search }: { search: string }): Promise<string | symbol> {
  return text({
    message: 'What is the new name of the project?',
    initialValue: search,
    validate: (value) => {
      if (!value) {
        return 'Please provide a name'
      }
      if (value === search) {
        return 'Replacement name is the same as the search name'
      }
    },
  })
}
async function promptConfirm(): Promise<boolean | symbol> {
  return confirm({
    message: `Are you sure you want to rename these pairs?`,
    initialValue: true,
  })
}
