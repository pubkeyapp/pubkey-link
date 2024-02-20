import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { Adapter, WalletError } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
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
