import { Group } from '@mantine/core'
import { useCluster } from '@pubkey-link/web-solana-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { SolanaUiAccountModalAirdrop } from './solana-ui-account-modal-airdrop'
import { SolanaUiAccountModalReceive } from './solana-ui-account-modal-receive'
import { SolanaUiAccountModalSend } from './solana-ui-account-modal-send'

export function SolanaUiAccountButtons({ address }: { address: PublicKey }) {
  const wallet = useWallet()
  const { cluster } = useCluster()

  return (
    <Group gap={2}>
      <SolanaUiAccountModalAirdrop disabled={cluster.network?.includes('mainnet')} address={address} />
      <SolanaUiAccountModalSend disabled={wallet.publicKey?.toString() !== address.toString()} address={address} />
      <SolanaUiAccountModalReceive address={address} />
    </Group>
  )
}
