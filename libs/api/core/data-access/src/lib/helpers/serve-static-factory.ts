import { Logger } from '@nestjs/common'
import { ServeStaticModuleOptions } from '@nestjs/serve-static'
import { existsSync } from 'node:fs'
import { join } from 'path'

export function serveStaticFactory() {
  return function (): ServeStaticModuleOptions[] {
    const rootPath = join(__dirname, '..', 'web')
    const rootExists = existsSync(rootPath)

    if (!rootExists) {
      Logger.verbose(`Static Hosting disabled: root path does not exist: ${rootPath}.`)
      return []
    }

    Logger.verbose(`Static Hosting enabled for: ${rootPath}.`)
    return [
      {
        rootPath,
        exclude: ['/api/*', '/graphql'],
      },
    ]
  }
}
