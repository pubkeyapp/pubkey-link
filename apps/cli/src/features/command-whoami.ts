import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandWhoami() {
  return new commander.Command('whoami').action((_, cmd) => new CommandService(cmd.optsWithGlobals()).whoami())
}
