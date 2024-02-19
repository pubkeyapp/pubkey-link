import { NetworkToken } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { NetworkTokenUiDetail } from './network-token-ui-detail'

export function NetworkTokenUiList({ tokens, username }: { tokens: NetworkToken[]; username: string }) {
  return (
    <UiStack>
      {tokens.map((token) => (
        <NetworkTokenUiDetail key={token.id} token={token} username={username} />
      ))}
    </UiStack>
  )
}
