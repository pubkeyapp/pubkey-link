import { BN } from '@coral-xyz/anchor'
import { uiToastLink } from '@pubkey-link/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'

export function useCounterSet() {
  const { account, program, refresh, getExplorerUrl } = useCounterProgramAccount()

  return useMutation({
    mutationKey: ['counter', 'decrement', { account }],
    mutationFn: (value: number) =>
      program.methods
        .set(new BN(value))
        .accounts({ counter: account.publicKey })
        .rpc()
        .then((signature) => {
          if (signature) {
            uiToastLink({
              link: getExplorerUrl(`/tx/${signature}`),
              label: 'View transaction',
            })
          }
          return refresh()
        })
        .catch((err) => toastError(err.message)),
  })
}
