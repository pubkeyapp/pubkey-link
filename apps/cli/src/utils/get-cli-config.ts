import { authenticateWithKeypair, getGraphQLSdk, Sdk } from '@pubkey-link/sdk'
import { getKeypairFromFile } from '@solana-developers/helpers'
import fs from 'fs'
import { PubKeyServer } from '../data-access/pubkey-server'

const home = process.env.HOME || process.env.USERPROFILE
const config = `${home}/.config/pubkey-link`

export async function getCliConfig(server: string, keypairPath: string) {
  if (!server) {
    throw new Error('Server not defined')
  }
  const keypair = await getKeypairFromFile(keypairPath)

  if (!keypair) {
    // TODO: Add instructions on how to create a keypair
    throw new Error(`Keypair not found: ${keypairPath}`)
  }

  const serversJson = `${config}/servers.json`
  const servers = JSON.parse(fs.readFileSync(serversJson, 'utf8')) as PubKeyServer[]

  if (!servers.length) {
    // TODO: Add command to add a server and list instructions on how to do so
    throw new Error(`No servers found in ${serversJson}`)
  }

  const found = servers.find((s) => s.id === server)
  if (!found) {
    throw new Error(`Server not found: ${server}`)
  }

  const sdk: Sdk = getGraphQLSdk(`${found.endpoint}/graphql`)

  const { cookie } = await authenticateWithKeypair({ keypair, sdk })

  return {
    cookie,
    keypair,
    sdk,
  }
}
