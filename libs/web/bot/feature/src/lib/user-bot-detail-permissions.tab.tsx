import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { UiDebug, UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailPermissionsTab() {
  const { item, query } = useUserFindOneBot()

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Bot not found." />
  }

  return (
    <UiStack>
      <UserBotPermissionUiTable permissions={item.permissions ?? []} />
      <UiDebug data={item.permissions ?? []} />
    </UiStack>
  )
}
