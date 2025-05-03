import { Switch } from '@mantine/core'
import { AdminUpdateNetworkTokenInput, NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { toastInfo } from '@pubkey-ui/core'

export function NetworkTokenUiToggleFeatured({
  networkToken,
  updateToken,
}: {
  networkToken: NetworkToken
  updateToken: (input: AdminUpdateNetworkTokenInput) => Promise<NetworkToken | boolean>
}) {
  if (networkToken.type !== NetworkTokenType.NonFungible && networkToken.type !== NetworkTokenType.Fungible) {
    return null
  }
  return (
    <Switch
      label="Featured"
      description="Features this token as a Collection or Token on the platform."
      checked={networkToken?.featured ?? false}
      onChange={(e) =>
        updateToken({ featured: e.target.checked }).then((res) => {
          if (typeof res === 'boolean') {
            return
          }
          toastInfo(`Featured ${res.featured ? 'enabled' : 'disabled'}`)
        })
      }
    />
  )
}
