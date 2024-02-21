import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandNetwork() {
  const command = new commander.Command('network')

  command
    .command('get')
    .argument('<networkId>', 'Network ID')
    .action((networkId, _, cmd) => new CommandService(cmd.optsWithGlobals().server).networkGet(networkId))

  command.command('list').action((_, cmd) => new CommandService(cmd.optsWithGlobals().server).networkList())

  command
    .command('sync')
    .argument('<cluster>', 'Cluster to sync assets for')
    .action((cluster, _, cmd) => new CommandService(cmd.optsWithGlobals().server).networkSync(cluster))
  return command
}
