import { OptionalKind, ParameterDeclarationStructure, Scope, SourceFile } from 'ts-morph'

export function addConstructors(
  source: SourceFile,
  targetClass: string,
  items: { type: string; name: string; private: boolean }[],
) {
  const parameters: OptionalKind<ParameterDeclarationStructure>[] = items.map(({ type, name, private: isPrivate }) => ({
    isReadonly: true,
    name,
    scope: isPrivate ? Scope.Private : undefined,
    type,
  }))
  source.getClass(targetClass).addConstructor({ parameters })
}
