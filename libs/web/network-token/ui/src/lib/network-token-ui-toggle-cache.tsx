import { Switch } from '@mantine/core'
import { AdminUpdateNetworkTokenInput, NetworkToken } from '@pubkey-link/sdk'
import { toastInfo } from '@pubkey-ui/core'

export function NetworkTokenUiToggleCache({
  networkToken,
  updateToken,
}: {
  networkToken: NetworkToken
  updateToken: (input: AdminUpdateNetworkTokenInput) => Promise<NetworkToken | boolean>
}) {
  return (
    <Switch
      label="Cache"
      description="Enables caching of the network tokens."
      checked={networkToken?.cache ?? false}
      onChange={(e) =>
        updateToken({ cache: e.target.checked }).then((res) => {
          if (typeof res === 'boolean') {
            return
          }
          toastInfo(`Cache ${res.cache ? 'enabled' : 'disabled'}`)
        })
      }
    />
  )
}
