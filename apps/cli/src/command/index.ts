import { getBackup, listBackups, restoreBackup } from './restore-backup'
import { syncAssets } from './sync-assets'
import { whoami } from './whoami'

export function runCommand(command: string, server: string, params: string[]) {
  switch (command) {
    case 'backup:get':
      return getBackup(server, params)
    case 'backup:list':
      return listBackups(server)
    case 'backup:restore':
      return restoreBackup(server, params)
    case 'network-asset:sync':
      return syncAssets(server)
    case 'whoami':
      return whoami(server)
    default:
      console.error(`Unknown command: ${command}`)
      process.exit(1)
  }
}
