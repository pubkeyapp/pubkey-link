import { getEnumOptions, NetworkCluster } from '@pubkey-link/sdk'
import { UiSelectEnumOption } from '@pubkey-link/web-ui-core'

export function NetworkUiSelectCluster({
  value,
  setValue,
}: {
  value: NetworkCluster | undefined
  setValue: (role: NetworkCluster) => void
}) {
  return (
    <UiSelectEnumOption<NetworkCluster>
      value={value}
      setValue={(value) => setValue(value ?? NetworkCluster.SolanaMainnet)}
      options={[
        { value: '', label: 'Filter by cluster' },
        ...getEnumOptions(NetworkCluster)
          .filter((item) => ![NetworkCluster.SolanaCustom, NetworkCluster.SolanaTestnet].includes(item.value))
          .map(({ label, value }) => ({
            value,
            label: label.replace('Solana', 'Solana '),
          })),
      ]}
    />
  )
}
