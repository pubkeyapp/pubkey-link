import { TextInput } from '@mantine/core'
import { NetworkToken, RuleConditionType } from '@pubkey-link/sdk'
import { NetworkTokenUiSelect } from '@pubkey-link/web-network-token-ui'
import { UiStack, UiWarning } from '@pubkey-ui/core'

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
  type: RuleConditionType
  tokens: NetworkToken[]
}) {
  switch (type) {
    case RuleConditionType.AnybodiesAsset:
      return <UiWarning title="Not implemented" message="This condition type is not implemented yet." />
    case RuleConditionType.SolanaFungibleAsset:
    case RuleConditionType.SolanaNonFungibleAsset:
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
