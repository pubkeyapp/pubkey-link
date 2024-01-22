import { SourceFile, ts } from 'ts-morph'

export function addArrayItem(source: SourceFile, { name, content }: { name: string; content: string }) {
  const array = getArray(source, name)

  if (array) {
    array.addElement(content)
  }
  return source
}

function getArray(source: SourceFile, name: string) {
  return source.getVariableDeclaration(name)?.getInitializerIfKind(ts.SyntaxKind.ArrayLiteralExpression)
}
