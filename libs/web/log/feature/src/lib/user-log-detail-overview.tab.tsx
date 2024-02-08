import { BotUiItemById } from '@pubkey-link/web-bot-ui'
import { useUserFindOneLog } from '@pubkey-link/web-log-data-access'
import { FactTypes, UiKeyValueTable } from '@pubkey-link/web-ui-core'
import { UserUiItemById } from '@pubkey-link/web-user-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserLogDetailOverviewTab({ logId }: { logId: string }) {
  const { item, query } = useUserFindOneLog({ logId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Log not found." />
  }
  const items: FactTypes = []
  if (item.botId) {
    items.unshift(['Bot', <BotUiItemById communityId={item.communityId} />])
  }
  if (item.identity?.ownerId) {
    items.unshift(['Identity Owner', <UserUiItemById userId={item.identity.ownerId} />])
  }
  if (item.userId) {
    items.unshift(['User', <UserUiItemById userId={item.userId} />])
  }

  return (
    <UiCard p={0}>
      <UiKeyValueTable items={items.filter(Boolean)} />
    </UiCard>
  )
}
