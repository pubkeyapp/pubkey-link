import commander from 'commander'
import * as process from 'node:process'

import { commandBackup } from './features/command-backup'
import { commandCommunity } from './features/command-community'
import { commandNetwork } from './features/command-network'
import { commandSnapshot } from './features/command-snapshot'
import { commandWhoami } from './features/command-whoami'

const program = new commander.Command('pubkey-link')
  .description('CLI to interact with the PubKey Link API')
  .requiredOption('-s, --server <server>', 'Server to connect to', process.env.PUBKEY_SERVER_ID || 'local')

program.addCommand(commandBackup())
program.addCommand(commandCommunity())
program.addCommand(commandNetwork())
program.addCommand(commandSnapshot())
program.addCommand(commandWhoami())

program.parse(process.argv)
