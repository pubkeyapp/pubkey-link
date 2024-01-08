import { names, Tree } from '@nx/devkit'
import * as pluralize from 'pluralize'
import { WebLibType } from '../types/web-feature'
import { getWebLib } from './get-web-lib'

export function getWebModuleInfo(tree: Tree, app: string, type: WebLibType, name: string, modelName: string) {
  const lib = getWebLib(tree, app, name, type)
  const barrel = `${lib.project.sourceRoot}/index.ts`

  if (!tree.exists(barrel)) {
    throw new Error(`getWebDataAccessModuleInfo: ${barrel} does not exist in ${lib.project.sourceRoot}`)
  }

  const { className, fileName, propertyName } = names(modelName)
  const {
    className: classNamePlural,
    fileName: fileNamePlural,
    propertyName: propertyNamePlural,
  } = names(pluralize.plural(modelName))

  return {
    ...lib,
    barrel,
    className,
    classNamePlural,
    fileName,
    fileNamePlural,
    propertyName,
    propertyNamePlural,
  }
}
