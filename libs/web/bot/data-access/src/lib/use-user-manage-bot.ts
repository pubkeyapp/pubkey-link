import { Bot } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useState } from 'react'
import { useUserFindOneBot } from './use-user-find-one-bot'

export function useUserManageBot({ bot }: { bot: Bot }) {
  const { query } = useUserFindOneBot({ communityId: bot.communityId })
  const [starting, setStarting] = useState(false)
  const [stopping, setStopping] = useState(false)

  const sdk = useSdk()

  return {
    starting,
    stopping,
    leaveServer: async (serverId: string) =>
      sdk
        .userLeaveBotServer({ botId: bot.id, serverId })
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
        .userStartBot({ botId: bot.id })
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
        .userStopBot({ botId: bot.id })
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
