import { getEnumOptions, NetworkTokenType } from '@pubkey-link/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function NetworkTokenUiSelectType({
  value,
  setValue,
}: {
  value: NetworkTokenType | undefined
  setValue: (role: NetworkTokenType | undefined) => void
}) {
  return (
    <UiSelectEnum<NetworkTokenType>
      value={value}
      setValue={setValue}
      options={[{ value: '', label: 'Filter by type' }, ...getEnumOptions(NetworkTokenType)]}
    />
  )
}
