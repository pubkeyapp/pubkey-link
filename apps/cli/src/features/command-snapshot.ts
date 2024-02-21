import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandSnapshot() {
  const command = new commander.Command('snapshot')

  command
    .command('get')
    .argument('snapshotId', 'Name of the snapshot')
    .action(async (snapshotId, _, cmd) => new CommandService(cmd.optsWithGlobals().server).snapshotGet(snapshotId))

  command.command('list').action(async (_, cmd) => new CommandService(cmd.optsWithGlobals().server).snapshotList())

  command
    .command('create')
    .argument('name', 'Name of the snapshot')
    .action(async (name, _, cmd) => new CommandService(cmd.optsWithGlobals().server).snapshotCreate(name))

  return command
}
