import { Bot } from '@pubkey-link/sdk'
import { useUserFindManyBotPermissions } from '@pubkey-link/web-bot-data-access'
import { UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { UiDebug, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailPermissionsTab({ bot }: { bot: Bot }) {
  const { items, query } = useUserFindManyBotPermissions({ botId: bot.id })

  return query.isLoading ? (
    <UiLoader />
  ) : items.length ? (
    <UiStack>
      <UserBotPermissionUiTable permissions={items} />
      <UiDebug data={items} />
    </UiStack>
  ) : (
    <UiInfo message="No permissions found." />
  )
}
