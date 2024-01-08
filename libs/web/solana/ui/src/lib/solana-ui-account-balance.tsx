import { Box, TitleProps } from '@mantine/core'
import { useGetBalance } from '@pubkey-link/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'
import { SolanaUiBalanceSol } from './solana-ui-balance-sol'

export function SolanaUiAccountBalance({ address, ...props }: { address: PublicKey } & TitleProps) {
  const query = useGetBalance({ address })

  return (
    <Box onClick={() => query.refetch()} {...props}>
      {query.data ? <SolanaUiBalanceSol balance={query.data} /> : '...'} SOL
    </Box>
  )
}
