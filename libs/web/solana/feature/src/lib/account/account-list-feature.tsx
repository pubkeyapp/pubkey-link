import { Group } from '@mantine/core'
import { WalletButton } from '@pubkey-link/web-solana-ui'
import { UiPage } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navigate } from 'react-router-dom'

export default function AccountListFeature() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return <Navigate to={publicKey.toString()} replace />
  }

  return (
    <UiPage title="Connect your wallet to continue">
      <Group justify="center">
        <WalletButton size="xl" />
      </Group>
    </UiPage>
  )
}
