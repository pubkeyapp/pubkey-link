import { SourceFile } from 'ts-morph'

export function addNamedImport(source: SourceFile, importPackage: string, importClass: string | string[]) {
  const classes = Array.isArray(importClass) ? importClass : [importClass]
  return source.addImportDeclaration({
    moduleSpecifier: importPackage.replace('.ts', ''),
    namedImports: classes.map((c) => ({ name: c })),
  })
}
