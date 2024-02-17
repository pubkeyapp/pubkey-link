import { Bot } from '@pubkey-link/sdk'
import { useUserFindManyBotRoles } from '@pubkey-link/web-bot-data-access'
import { UserBotRoleUiTable } from '@pubkey-link/web-bot-ui'
import { UiDebug, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailRolesTab({ bot, serverId }: { bot: Bot; serverId: string }) {
  const { items, query } = useUserFindManyBotRoles({ botId: bot.id, serverId })

  return query.isLoading ? (
    <UiLoader />
  ) : items.length ? (
    <UiStack>
      <UserBotRoleUiTable roles={items} />
      <UiDebug data={items} />
    </UiStack>
  ) : (
    <UiInfo message="No permissions found." />
  )
}
