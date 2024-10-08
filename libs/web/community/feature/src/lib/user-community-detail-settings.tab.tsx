import { Group, Paper } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { UserBotFeature } from '@pubkey-link/web-bot-feature'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UserCommunityUiUpdateForm } from '@pubkey-link/web-community-ui'
import { UiCard, UiCardTitle, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { IconSettings } from '@tabler/icons-react'

export default function UserCommunityDetailSettingsTab({ community }: { community: Community }) {
  const { isLoading, item, communityAdmin, updateCommunity } = useUserFindOneCommunity({ communityId: community.id })

  if (isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return <UiError message="Community not found." />
  }

  if (!communityAdmin) {
    return <UiError message="You are not an admin." />
  }

  return (
    <UiStack>
      <Paper withBorder p="md">
        <Group>
          <IconSettings size={24} />
          <UiCardTitle>Settings</UiCardTitle>
        </Group>
      </Paper>
      <UiTabRoutes
        tabs={[
          {
            path: 'community',
            label: 'Community Settings',
            element: (
              <UiCard>
                <UserCommunityUiUpdateForm community={item} submit={updateCommunity} />
              </UiCard>
            ),
          },
          {
            path: 'discord',
            label: 'Discord',
            element: <UserBotFeature community={item} />,
          },
        ]}
      />
    </UiStack>
  )
}
