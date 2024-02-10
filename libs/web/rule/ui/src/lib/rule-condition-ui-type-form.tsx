import { TextInput } from '@mantine/core'
import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { NetworkTokenUiSelect } from '@pubkey-link/web-network-token-ui'
import { UiStack } from '@pubkey-ui/core'

export function RuleConditionUiTypeForm({
  amount,
  setAmount,
  networkToken,
  setNetworkToken,
  type,
  tokens,
}: {
  amount: string
  setAmount: (amount: string) => void
  networkToken?: NetworkToken | undefined
  setNetworkToken: (token: NetworkToken | undefined) => void
  type: NetworkTokenType
  tokens: NetworkToken[]
}) {
  switch (type) {
    case NetworkTokenType.Fungible:
    case NetworkTokenType.NonFungible:
      return (
        <UiStack>
          <NetworkTokenUiSelect value={networkToken} setValue={setNetworkToken} tokens={tokens} />
          <TextInput
            label="Amount"
            description="Amount of tokens to match"
            placeholder="Amount"
            value={amount}
            onChange={(event) => setAmount(event.currentTarget.value)}
          />
        </UiStack>
      )
    default:
      return <div>Unknown</div>
  }
}
