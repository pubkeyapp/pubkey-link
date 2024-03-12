import { Tree } from '@nx/devkit'
import { updateSourceFile } from './update-source-file'

export function addExport(tree: Tree, path: string, exportPath: string) {
  updateSourceFile(tree, path, (source) => {
    source.addExportDeclaration({ moduleSpecifier: exportPath.replace('.ts', '') })
    return source
  })
}

export function addExports(tree: Tree, path: string, exportPaths: string | string[]) {
  const currentExports = tree.read(path)?.toString('utf-8') ?? ''
  const paths = Array.isArray(exportPaths) ? exportPaths : [exportPaths]
  updateSourceFile(tree, path, (source) => {
    for (const exportPath of paths.filter((p) => !currentExports.includes(p))) {
      source.addExportDeclaration({ moduleSpecifier: exportPath.replace('.ts', '') })
    }
    return source
  })
}

export function replaceExports(tree: Tree, path: string, exportPaths: string | string[]) {
  tree.write(path, '')
  return addExports(tree, path, exportPaths)
}
