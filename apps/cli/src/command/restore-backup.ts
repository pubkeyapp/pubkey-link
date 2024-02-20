import { getCliConfig } from '../helpers/get-cli-config'
import { authenticateWithKeypair } from '../helpers/authenticate-with-keypair'

export async function getBackup(server: string, params: string[]) {
  const { keypair, sdk } = await getCliConfig(server)
  const cookie = await authenticateWithKeypair(sdk, keypair)

  const name = params[0]
  if (!name) {
    throw new Error('Name is required')
  }
  const res = await sdk.adminGetBackup({ name }, { cookie })
  console.log(res.data)
}

export async function listBackups(server: string) {
  const { keypair, sdk } = await getCliConfig(server)
  const cookie = await authenticateWithKeypair(sdk, keypair)

  const res = await sdk.adminGetBackups({}, { cookie })
  console.log(res.data)
}

export async function restoreBackup(server: string, params: string[]) {
  const { keypair, sdk } = await getCliConfig(server)
  const cookie = await authenticateWithKeypair(sdk, keypair)

  const name = params[0]
  if (!name) {
    throw new Error('Name is required')
  }
  const res = await sdk.adminRestoreBackup({ name }, { cookie })
  console.log(res.data)
}
