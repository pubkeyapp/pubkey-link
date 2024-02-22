import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandSnapshot() {
  const command = new commander.Command('snapshot')

  command
    .command('get')
    .argument('snapshotId', 'Name of the snapshot')
    .action(async (snapshotId, _, cmd) => new CommandService(cmd.optsWithGlobals()).snapshotGet(snapshotId))

  command.command('list').action(async (_, cmd) => new CommandService(cmd.optsWithGlobals()).snapshotList())

  command
    .command('create')
    .argument('name', 'Name of the snapshot')
    .action(async (name, _, cmd) => new CommandService(cmd.optsWithGlobals()).snapshotCreate(name))

  return command
}
