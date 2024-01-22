import { ObjectLiteralExpression, SourceFile } from 'ts-morph'

export function getDecoratorArgs(source: SourceFile, targetClass: string, decoratorName: string) {
  const moduleDecorator = source.getClass(targetClass).getDecorator(decoratorName)
  return moduleDecorator.getArguments()[0] as ObjectLiteralExpression
}
