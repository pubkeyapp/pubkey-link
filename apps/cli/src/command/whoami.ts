import { getCliConfig } from '../helpers/get-cli-config'
import { authenticateWithKeypair } from '../helpers/authenticate-with-keypair'

export async function whoami(server: string) {
  const { keypair, sdk } = await getCliConfig(server)
  const cookie = await authenticateWithKeypair(sdk, keypair)

  const res = await sdk.me(undefined, { cookie })
  console.log(res.data?.me)
}
