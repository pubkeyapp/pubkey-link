import { UserCreateBotInput, UserUpdateBotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useUserCommunity } from '@pubkey-link/web-community-data-access'
import { useState } from 'react'

export function useUserFindOneBot() {
  const { communityId } = useUserCommunity()

  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-bot', communityId],
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

export function useUserManageBot({ botId }: { botId: string }) {
  const { query } = useUserFindOneBot()
  const [starting, setStarting] = useState(false)
  const [stopping, setStopping] = useState(false)

  const sdk = useSdk()

  return {
    starting,
    stopping,
    leaveServer: async (serverId: string) =>
      sdk
        .userLeaveBotServer({ botId, serverId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            if (res.left) {
              toastSuccess('Bot left server')
            } else {
              toastError('Bot did not leave server')
            }
            await query.refetch()
            return true
          }
          toastError('Error leaving server')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    startBot: async () => {
      setStarting(true)
      return sdk
        .userStartBot({ botId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            if (res.started) {
              toastSuccess('Bot started')
            } else {
              toastError('Bot not started')
            }
            await query.refetch()
            return true
          }
          toastError('Error starting bot')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        })
        .finally(() => setStarting(false))
    },
    stopBot: async () => {
      setStopping(true)
      return sdk
        .userStopBot({ botId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            if (res.stopped) {
              toastSuccess('Bot stopped')
            } else {
              toastError('Bot not stopped')
            }
            await query.refetch()
            return true
          }
          toastError('Error stopping bot')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        })
        .finally(() => setStopping(false))
    },
  }
}
