import { Tree } from '@nx/devkit'

export function getRecursiveFileNames({
  tree,
  path,
  exclude = [],
}: {
  tree: Tree
  path: string
  exclude?: string[]
}): string[] {
  const contents: string[] = []
  const dir = tree.children(path)
  dir
    .filter((file) => !exclude.includes(`${path}/${file}`))
    .forEach((file) => {
      if (tree.isFile(`${path}/${file}`)) {
        contents.push(`${path}/${file}`)
      } else {
        contents.push(
          ...getRecursiveFileNames({ tree, path: `${path}/${file}`, exclude }).sort((a, b) => a.localeCompare(b)),
        )
      }
    })

  return contents
}
