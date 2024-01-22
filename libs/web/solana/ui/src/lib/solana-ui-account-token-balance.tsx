import { Loader, Text, TextProps } from '@mantine/core'
import { useGetTokenBalance } from '@pubkey-link/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'

export function SolanaUiAccountTokenBalance({ address, ...props }: { address: PublicKey } & TextProps) {
  const query = useGetTokenBalance({ address })
  return query.isLoading ? (
    <Loader size="xs" type="dots" />
  ) : query.data ? (
    <Text {...props}>{query.data?.value.uiAmount}</Text>
  ) : (
    <div>Error</div>
  )
}
