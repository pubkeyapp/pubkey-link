import { AvatarProps, type GroupProps, Text } from '@mantine/core'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { type UiAnchorProps, UiLoader } from '@pubkey-ui/core'
import { BotUiItem } from './bot-ui-item'

export function BotUiItemById({
  communityId,
  ...props
}: {
  communityId: string
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  to?: string | null
}) {
  const { query } = useUserFindOneBot({ communityId })

  return query.isLoading ? (
    <UiLoader size="xs" type="dots" />
  ) : query.data?.item ? (
    <BotUiItem bot={query.data.item} {...props} />
  ) : (
    <Text c="red">Bot not found</Text>
  )
}
