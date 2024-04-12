import { TextInput, TextInputProps } from '@mantine/core'
import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { NetworkTokenUiSelect } from '@pubkey-link/web-network-token-ui'
import { UiStack } from '@pubkey-ui/core'

export function RoleConditionUiTypeForm({
  networkToken,
  setNetworkToken,
  type,
  tokens,
}: {
  networkToken?: NetworkToken | undefined
  setNetworkToken: (token: NetworkToken | undefined) => void
  type: NetworkTokenType
  tokens: NetworkToken[]
}) {
  switch (type) {
    case NetworkTokenType.Fungible:
    case NetworkTokenType.NonFungible:
    case NetworkTokenType.Validator:
      return (
        <UiStack>
          <NetworkTokenUiSelect value={networkToken} setValue={setNetworkToken} tokens={tokens} />
        </UiStack>
      )
    default:
      return <div>Unknown</div>
  }
}

export function RoleConditionUiAmountForm({
  amount,
  setAmount,
  ...props
}: TextInputProps & {
  amount: string
  setAmount: (amount: string) => void
}) {
  return (
    <TextInput
      label="Amount"
      description="Amount of tokens to match"
      step="any"
      min="0"
      value={amount}
      onChange={(event) => setAmount(event.currentTarget.value)}
      {...props}
    />
  )
}
