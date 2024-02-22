import commander from 'commander'
import * as process from 'node:process'

import { commandBackup } from './features/command-backup'
import { commandCommunity } from './features/command-community'
import { commandNetwork } from './features/command-network'
import { commandRepl } from './features/command-repl'
import { commandSnapshot } from './features/command-snapshot'
import { commandUptime } from './features/command-uptime'
import { commandWhoami } from './features/command-whoami'

const program = new commander.Command('pubkey-link')
  .description('CLI to interact with the PubKey Link API')
  .requiredOption(
    '-k, --keypair <keypair>',
    'Path to key',
    process.env.PUBKEY_KEYPAIR || '~/.config/pubkey-link/id.json',
  )
  .requiredOption('-s, --server <server>', 'Server to connect to', process.env.PUBKEY_SERVER_ID || 'local')

program.addCommand(commandBackup())
program.addCommand(commandCommunity())
program.addCommand(commandNetwork())
program.addCommand(commandRepl())
program.addCommand(commandSnapshot())
program.addCommand(commandUptime())
program.addCommand(commandWhoami())

program.parse(process.argv)
