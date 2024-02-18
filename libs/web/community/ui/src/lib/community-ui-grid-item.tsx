import { ActionIcon, ActionIconProps, Group, Paper, Tooltip } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandTelegram,
  IconBrandX,
  IconWorld,
} from '@tabler/icons-react'
import { ComponentType, ReactNode } from 'react'
import { CommunityUiItem } from './community-ui-item'

export function CommunityUiGridItem({
  children,
  community,
  to,
}: {
  children?: ReactNode
  community: Community
  to?: string
}) {
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={community} to={to} />
          <Group gap="4">
            <UiDebugModal data={community} />
            <CommunityUiSocialDiscord community={community} />
            <CommunityUiSocialGithub community={community} />
            <CommunityUiSocialTelegram community={community} />
            <CommunityUiSocialWebsite community={community} />
            <CommunityUiSocialX community={community} />
          </Group>
        </UiGroup>
        {children}
      </UiStack>
    </Paper>
  )
}

export interface CommunityUiSocialProps extends ActionIconProps {
  icon: ComponentType<{ color?: string; size: number }>
  tooltip?: string
  href?: string | null
}
export function CommunityUiSocial({ href, icon: Icon, tooltip, ...props }: CommunityUiSocialProps) {
  if (!href) {
    return null
  }
  const el = (
    <ActionIcon size="sm" variant="light" component="a" href={href} target="_blank" {...props}>
      <Icon size={16} />
    </ActionIcon>
  )

  return tooltip ? <Tooltip label={tooltip}>{el}</Tooltip> : el
}

export function CommunityUiSocialX({ community, ...props }: ActionIconProps & { community: Community }) {
  return <CommunityUiSocial href={community.twitterUrl} tooltip="Follow us on X" icon={IconBrandX} {...props} />
}
export function CommunityUiSocialDiscord({ community, ...props }: ActionIconProps & { community: Community }) {
  return (
    <CommunityUiSocial
      href={community.discordUrl}
      tooltip="Join our Discord"
      icon={IconBrandDiscordFilled}
      {...props}
    />
  )
}
export function CommunityUiSocialGithub({ community, ...props }: ActionIconProps & { community: Community }) {
  return (
    <CommunityUiSocial
      href={community.githubUrl}
      tooltip="Follow us on GitHub"
      icon={IconBrandGithubFilled}
      {...props}
    />
  )
}
export function CommunityUiSocialTelegram({ community, ...props }: ActionIconProps & { community: Community }) {
  return (
    <CommunityUiSocial href={community.telegramUrl} tooltip="Join our Telegram" icon={IconBrandTelegram} {...props} />
  )
}
export function CommunityUiSocialWebsite({ community, ...props }: ActionIconProps & { community: Community }) {
  return <CommunityUiSocial href={community.websiteUrl} tooltip="Visit our website" icon={IconWorld} {...props} />
}

export function CommunityUiSocials({ community, ...props }: ActionIconProps & { community: Community }) {
  return (
    <Group gap="4">
      <CommunityUiSocialDiscord community={community} {...props} />
      <CommunityUiSocialGithub community={community} {...props} />
      <CommunityUiSocialTelegram community={community} {...props} />
      <CommunityUiSocialWebsite community={community} {...props} />
      <CommunityUiSocialX community={community} {...props} />
    </Group>
  )
}
