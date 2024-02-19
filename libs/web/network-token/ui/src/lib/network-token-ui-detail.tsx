import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'

import { UiInfo } from '@pubkey-ui/core'
import { NetworkTokenUiDetailFungible } from './network-token-ui-detail-fungible'
import { NetworkTokenUiDetailNonFungible } from './network-token-ui-detail-non-fungible'

export function NetworkTokenUiDetail(props: { token: NetworkToken; username: string }) {
  switch (props.token.type) {
    case NetworkTokenType.Fungible:
      return <NetworkTokenUiDetailFungible {...props} />
    case NetworkTokenType.NonFungible:
      return <NetworkTokenUiDetailNonFungible {...props} />
    default:
      return <UiInfo message="Unknown token type." />
  }
}
