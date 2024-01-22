import { Tree } from '@nx/devkit'
import { updateSourceFile } from '../utils/update-source-file'

export function addServiceToClassConstructor(
  tree: Tree,
  path: string,
  targetClassName: string,
  property: string,
  serviceName: string,
  importPath: string,
) {
  updateSourceFile(tree, path, (sourceFile) => {
    // Check if the import already exists
    const existingImport = sourceFile.getImportDeclaration((importDeclaration) => {
      return (
        importDeclaration.getModuleSpecifierValue() === importPath &&
        importDeclaration.getNamedImports().some((namedImport) => namedImport.getName() === serviceName)
      )
    })

    // If the import doesn't exist, add it
    if (!existingImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: `./${importPath.replace(/\.ts$/, '')}`,
        namedImports: [{ name: serviceName }],
      })
    }

    // Find the target class
    const targetClass = sourceFile.getClass(targetClassName)
    if (!targetClass) {
      throw new Error('Target class not found')
    }

    // Modify or add the constructor
    const constructors = targetClass.getConstructors()
    const constructor = constructors.length > 0 ? constructors[0] : null
    if (constructor) {
      // Check if the service is already injected
      if (!constructor.getParameters().some((param) => param.getName() === property)) {
        constructor.addParameter({
          name: property,
          type: serviceName,
          isReadonly: true,
        })
      }
    } else {
      // Add a new constructor with the service injection
      targetClass.addConstructor({
        parameters: [
          {
            name: property,
            type: serviceName,
            isReadonly: true,
          },
        ],
        statements: [],
      })
    }

    return sourceFile
  })
}
