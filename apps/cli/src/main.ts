import { runCommand } from './command'

const server = process.argv[2]
const command = process.argv[3]

if (!server) {
  console.error('Server is required')
  process.exit(1)
}
if (!command) {
  console.error('Command is required')
  process.exit(1)
}

const params: string[] = process.argv.slice(4) ?? []

runCommand(command, server, params)
  .then(() => process.exit(0))
  .catch((err) => console.error(err))
