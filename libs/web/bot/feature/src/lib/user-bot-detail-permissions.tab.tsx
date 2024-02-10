import { Bot } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { UiDebug, UiError, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailPermissionsTab({ bot }: { bot: Bot }) {
  const { item, query } = useUserFindOneBot({ communityId: bot.communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Bot not found." />
  }

  return item.permissions?.length ? (
    <UiStack>
      <UserBotPermissionUiTable permissions={item.permissions ?? []} />
      <UiDebug data={item.permissions ?? []} />
    </UiStack>
  ) : (
    <UiInfo message="No permissions found." />
  )
}
