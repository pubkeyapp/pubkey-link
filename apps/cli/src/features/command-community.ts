import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandCommunity() {
  const command = new commander.Command('community')

  command
    .command('get')
    .argument('<communityId>', 'Community ID')
    .action((communityId, _, cmd) => new CommandService(cmd.optsWithGlobals()).communityGet(communityId))

  command.command('list').action((_, cmd) => new CommandService(cmd.optsWithGlobals()).communityList())

  return command
}
