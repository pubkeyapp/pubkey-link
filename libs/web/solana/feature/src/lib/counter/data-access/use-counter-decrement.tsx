import { uiToastLink } from '@pubkey-link/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'

export function useCounterDecrement() {
  const { account, program, getExplorerUrl, refresh } = useCounterProgramAccount()

  return useMutation({
    mutationKey: ['counter', 'decrement', { account }],
    mutationFn: () =>
      program.methods
        .decrement()
        .accounts({ counter: account.publicKey })
        .rpc()
        .then((signature) => {
          uiToastLink({
            link: getExplorerUrl(`/tx/${signature}`),
            label: 'View transaction',
          })
          return refresh()
        })
        .catch((err) => toastError(err.message)),
  })
}
