import { Tree } from '@nx/devkit'
import { SyntaxKind } from 'ts-morph'
import { updateSourceFile } from '../utils/update-source-file'

export function addServiceToModuleDecorator(tree: Tree, path: string, serviceName: string, importPath: string) {
  const arrayName = 'providers'
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
    } else {
      console.log(`Import already exists: ${importPath}`)
    }

    const classes = sourceFile.getClasses()
    const moduleClass = classes.find((c) => {
      return c.getDecorators().some((d) => d.getName() === 'Module')
    })

    if (!moduleClass) {
      throw new Error('Module class not found')
    }

    // Find the @Module decorator
    const moduleDecorator = moduleClass.getDecorator('Module')
    if (!moduleDecorator) {
      throw new Error('@Module decorator not found')
    }

    // Get the first argument of the decorator which should be an object literal expression
    const decoratorArgument = moduleDecorator.getArguments()[0]
    if (!decoratorArgument || !decoratorArgument.asKind(SyntaxKind.ObjectLiteralExpression)) {
      throw new Error('Expected an object literal as the first argument of the @Module decorator')
    }

    const objectLiteral = decoratorArgument.asKind(SyntaxKind.ObjectLiteralExpression)
    const providersProperty = objectLiteral?.getProperty(arrayName)

    if (providersProperty && providersProperty.getKind() === SyntaxKind.PropertyAssignment) {
      const providersAssignment = providersProperty.asKind(SyntaxKind.PropertyAssignment)
      const providersArray = providersAssignment.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression)

      if (providersArray) {
        providersArray.addElement(serviceName)
      } else {
        throw new Error(`Expected the ${arrayName} property to be an array`)
      }
    } else {
      // If there is no 'arrayName' array, add one
      objectLiteral.addPropertyAssignment({
        name: arrayName,
        initializer: `[${serviceName}]`,
      })
    }

    return sourceFile
  })
}
