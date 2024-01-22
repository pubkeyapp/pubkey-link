import { Group } from '@mantine/core'
import { ellipsify } from '@pubkey-link/sdk'
import {
  SolanaUiAccountBalance,
  SolanaUiAccountButtons,
  SolanaUiAccountTokens,
  SolanaUiAccountTransactions,
  SolanaUiExplorerLink,
} from '@pubkey-link/web-solana-ui'
import { UiPage, UiStack } from '@pubkey-ui/core'
import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'

import { useParams } from 'react-router-dom'

export default function AccountDetailFeature() {
  const params = useParams()
  const address = useMemo(() => {
    if (!params.address) {
      return
    }
    try {
      return new PublicKey(params.address)
    } catch (e) {
      console.log(`Invalid public key`, e)
    }
  }, [params])
  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <UiPage
      title={<SolanaUiAccountBalance order={2} address={address} />}
      rightAction={
        <Group>
          <SolanaUiExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
          <SolanaUiAccountButtons address={address} />
        </Group>
      }
    >
      <UiStack>
        <SolanaUiAccountTokens address={address} />
        <SolanaUiAccountTransactions address={address} />
      </UiStack>
    </UiPage>
  )
}
