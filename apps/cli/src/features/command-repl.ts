import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandRepl() {
  return new commander.Command('repl').action((_, cmd) => new CommandService(cmd.optsWithGlobals()).repl())
}
