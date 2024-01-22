import { uiToastLink } from '@pubkey-link/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'

export function useCounterClose() {
  const { account, program, refresh, getExplorerUrl } = useCounterProgramAccount()

  return useMutation({
    mutationKey: ['counter', 'close', { account }],
    mutationFn: () =>
      program.methods
        .closeCounter()
        .accounts({ counter: account.publicKey })
        .rpc()
        .then(async (signature) => {
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
