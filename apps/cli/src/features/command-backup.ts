import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandBackup() {
  const command = new commander.Command('backup')

  command
    .command('get')
    .argument('name', 'Name of the backup')
    .action(async (name, _, cmd) => new CommandService(cmd.optsWithGlobals()).backupGet(name))

  command.command('list').action(async (_, cmd) => new CommandService(cmd.optsWithGlobals()).backupList())

  command
    .command('restore')
    .argument('name', 'Name of the backup')
    .action(async (name, _, cmd) => new CommandService(cmd.optsWithGlobals()).backupRestore(name))

  return command
}
