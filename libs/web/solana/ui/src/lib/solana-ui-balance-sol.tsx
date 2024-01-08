import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useMemo } from 'react'

export function SolanaUiBalanceSol({ balance }: { balance: number }) {
  const formatted = useMemo(() => formatUSD(Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000), [balance])
  return <span>{formatted}</span>
}

export function formatUSD(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 5,
  })
    .format(amount)
    .replace('$', '')
}
