import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { Bot } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { BotUiAvatar } from './bot-ui-avatar'
import { IconBrandDiscord } from '@tabler/icons-react'

export function BotUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  bot,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  bot?: Bot
  to?: string | null
}) {
  if (!bot) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <BotUiAvatar bot={bot} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lx" fw="bold">
            {bot?.name}
          </Text>
          <Text size="sm" c="dimmed" span>
            <Group gap={4}>
              <IconBrandDiscord size={16} />
              Discord
            </Group>
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
