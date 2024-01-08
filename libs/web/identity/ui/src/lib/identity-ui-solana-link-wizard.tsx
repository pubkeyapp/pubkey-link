import { Identity } from '@pubkey-link/sdk'
import { useIdentitySolana } from '@pubkey-link/web-identity-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { IdentityUiSolanaWizard, IdentityUiSolanaWizardProps } from './identity-ui-solana-wizard'

export function IdentityUiSolanaLinkWizard({
  refresh,
  identities,
  ...props
}: Omit<IdentityUiSolanaWizardProps, 'sign'> & { refresh: () => void; identities: Identity[] }) {
  const { connected, publicKey } = useWallet()
  const { linkAndSign } = useIdentitySolana()
  const [active, setActive] = useState(0)
  const exists = identities?.some((item) => item.providerId === publicKey?.toBase58())

  useEffect(() => {
    if (connected && active === 0) {
      setActive(1)
    }
  }, [active, connected])

  async function request(useLedger: boolean) {
    return linkAndSign({ publicKey: publicKey!.toString(), useLedger })
      .catch((err) => {
        console.log('Error linking identity', err)
        toastError('Error linking identity')
        return false
      })
      .finally(() => {
        refresh()
      })
  }

  return <IdentityUiSolanaWizard exists={exists} sign={request} {...props} />
}
