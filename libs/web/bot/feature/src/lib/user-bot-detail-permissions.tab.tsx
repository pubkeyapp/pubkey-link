import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { UiDebug, UiError, UiLoader, UiStack } from '@pubkey-ui/core'
import { UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'

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
      <UserBotPermissionUiTable
        permissions={item.permissions ?? []}
        deleteBotPermission={(permission) => {
          console.log({ permission })
        }}
      />
      <UiDebug data={item.permissions ?? []} />
    </UiStack>
  )
}
