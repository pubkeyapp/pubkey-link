import { Group } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import {
  UiSocialDiscord,
  UiSocialGithub,
  UiSocialProps,
  UiSocialTelegram,
  UiSocialWebsite,
  UiSocialX,
} from '@pubkey-link/web-ui-core'
import { ReactNode } from 'react'

export function CommunityUiSocials({
  children,
  community,
  ...props
}: Omit<UiSocialProps, 'icon'> & { children?: ReactNode; community: Community }) {
  return (
    <Group gap="4">
      {children}
      <UiSocialDiscord href={community.discordUrl} {...props} />
      <UiSocialGithub href={community.githubUrl} {...props} />
      <UiSocialTelegram href={community.telegramUrl} {...props} />
      <UiSocialX href={community.twitterUrl} {...props} />
      <UiSocialWebsite href={community.websiteUrl} {...props} />
    </Group>
  )
}
