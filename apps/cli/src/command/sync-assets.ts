import { getCliConfig } from '../helpers/get-cli-config'
import { authenticateWithKeypair } from '../helpers/authenticate-with-keypair'
import { NetworkCluster } from '@pubkey-link/sdk'

export async function syncAssets(server: string) {
  const { keypair, sdk } = await getCliConfig(server)
  const cookie = await authenticateWithKeypair(sdk, keypair)

  const res = await sdk.adminSyncNetworkAssets({ cluster: NetworkCluster.SolanaMainnet }, { cookie })
  console.log(res.data)
}
