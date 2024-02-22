import commander from 'commander'
import { CommandService } from '../data-access/command-service'

export function commandUptime() {
  return new commander.Command('uptime').action((_, cmd) => {
    new CommandService(cmd.optsWithGlobals()).uptime().then((res) => {
      console.log(res)
    })
  })
}
