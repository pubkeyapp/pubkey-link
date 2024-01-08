import { Program } from '@coral-xyz/anchor'
import { CounterIDL, getCounterProgramId } from '@pubkey-link/anchor'
import { useAnchorProvider, useCluster } from '@pubkey-link/web-solana-data-access'
import { Cluster } from '@solana/web3.js'

import { useMemo } from 'react'

export function useCounterProgram() {
  const provider = useAnchorProvider()
  const { cluster } = useCluster()

  const programId = useMemo(() => getCounterProgramId(cluster.network as Cluster), [cluster])
  return new Program(CounterIDL, programId, provider)
}
