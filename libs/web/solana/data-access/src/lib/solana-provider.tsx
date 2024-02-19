import { AnchorProvider } from '@coral-xyz/anchor'
import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { Adapter, WalletError } from '@solana/wallet-adapter-base'
import {
  AnchorWallet,
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { ReactNode, useCallback, useMemo } from 'react'
import { ClusterProvider, useCluster } from './cluster-provider'

export function SolanaClusterProvider({ autoConnect, children }: { autoConnect?: boolean; children: ReactNode }) {
  return (
    <ClusterProvider>
      <SolanaProvider autoConnect={autoConnect}>{children}</SolanaProvider>
    </ClusterProvider>
  )
}

export function SolanaProvider({ autoConnect = false, children }: { autoConnect?: boolean; children: ReactNode }) {
  const { cluster } = useCluster()
  const endpoint = useMemo(() => cluster.endpoint, [cluster])

  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[] as Adapter[]} onError={onError} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function useAnchorProvider() {
  const { connection } = useConnection()
  const wallet = useWallet()

  return new AnchorProvider(connection, wallet as AnchorWallet, { commitment: 'confirmed' })
}
