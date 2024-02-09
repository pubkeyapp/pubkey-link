import { getEnumOptions, NetworkTokenType } from '@pubkey-link/sdk'
import { UiSelectEnumOption } from '@pubkey-link/web-ui-core'

export function NetworkTokenUiSelectType({
  value,
  setValue,
}: {
  value: NetworkTokenType | undefined
  setValue: (role: NetworkTokenType | undefined) => void
}) {
  return (
    <UiSelectEnumOption<NetworkTokenType>
      value={value}
      setValue={setValue}
      options={[{ value: '', label: 'Filter by type' }, ...getEnumOptions(NetworkTokenType)]}
    />
  )
}
