import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandWhoami() {
  return new commander.Command('whoami').action((_, cmd) => {
    const opts = cmd.optsWithGlobals()

    return new CommandService(opts.server).whoami()
  })
}
