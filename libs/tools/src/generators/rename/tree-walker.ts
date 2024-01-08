import { Tree } from '@nx/devkit'

export type TreeSummary = TreeSummaryFile | TreeSummaryDirectory

export interface TreeSummaryFile {
  path: string
  contents: string
}
export interface TreeSummaryDirectory {
  path: string
  children: TreeSummary[]
}

const exclude = [
  'node_modules',
  '.git',
  '.idea',
  '.next',
  '.vscode',
  'dist',
  'coverage',
  'cypress',
  'tmp',
  'yarn.lock',
  'pnpm-lock.yaml',
]

export function treeWalker({
  tree,
  path = '.',
  filters,
}: {
  tree: Tree
  path: string
  filters: string[]
}): TreeSummary {
  if (tree.isFile(path)) {
    const contents = tree.read(path, 'utf-8')
    // Return only if file names or contents have occurrences of the filter
    if (filters.some((f) => path.includes(f)) || filters.some((f) => contents.includes(f))) {
      return { path, contents }
    } else {
      return undefined
    }
  }

  const results: TreeSummaryDirectory = {
    path,
    children: [],
  }

  for (const child of tree.children(path).filter((n) => !exclude.includes(n))) {
    const summary = treeWalker({ filters, path: `${path}/${child}`, tree })
    if ((summary as TreeSummaryDirectory)?.children?.length > 0) {
      results.children.push(summary)
    } else if ((summary as TreeSummaryFile)?.contents) {
      results.children.push(summary)
    }
  }
  return results
}

export function flattenTreeSummary(summary: TreeSummary): Record<string, TreeSummary> {
  const result: Record<string, TreeSummary> = {}
  if ((summary as TreeSummaryFile)?.contents) {
    result[(summary as TreeSummaryFile).path] = summary
  } else if ((summary as TreeSummaryDirectory)?.children) {
    for (const child of (summary as TreeSummaryDirectory).children) {
      Object.assign(result, flattenTreeSummary(child))
    }
  }
  return result
}
