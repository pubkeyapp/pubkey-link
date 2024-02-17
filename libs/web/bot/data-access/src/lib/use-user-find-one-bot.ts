import { UserCreateBotInput, UserUpdateBotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneBot({ communityId }: { communityId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-bot', { communityId }],
    queryFn: () => sdk.userFindOneBot({ communityId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
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
          await query.refetch()
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteBot: (botId: string) =>
      sdk.userDeleteBot({ botId }).then(async () => {
        toastSuccess('Bot deleted')
        await query.refetch()
      }),
    updateBot: async (botId: string, input: UserUpdateBotInput) =>
      sdk
        .userUpdateBot({ botId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Bot updated')
            await query.refetch()
            return true
          }
          toastError('Bot not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
