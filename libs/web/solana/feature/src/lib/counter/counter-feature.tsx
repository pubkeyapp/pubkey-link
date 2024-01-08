import { Group } from '@mantine/core'
import { WalletButton } from '@pubkey-link/web-solana-ui'
import { UiPage } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { CounterListFeature } from './counter-list-feature'

export default function CounterFeature() {
  const { publicKey } = useWallet()

  if (!publicKey)
    return (
      <UiPage title="Connect your wallet to continue">
        <Group justify="center">
          <WalletButton size="xl" />
        </Group>
      </UiPage>
    )

  return <CounterListFeature />
}
