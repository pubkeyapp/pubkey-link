import { UserCreateBotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useUserCommunity } from '@pubkey-link/web-community-data-access'

export function useUserFindManyBot() {
  const { communityId } = useUserCommunity()
  const sdk = useSdk()

  return {
    createBot: (input: UserCreateBotInput) =>
      sdk
        .userCreateBot({ input: { ...input, communityId } })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Bot created`)
          } else {
            toastError(`Bot not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteBot: (botId: string) =>
      sdk.userDeleteBot({ botId }).then(() => {
        toastSuccess('Bot deleted')
      }),
  }
}
