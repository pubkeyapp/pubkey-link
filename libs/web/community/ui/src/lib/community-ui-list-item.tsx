import { AspectRatio, Box, Button, Grid, Paper, SimpleGrid, Text } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { RoleUiList } from '@pubkey-link/web-role-ui'
import { UiAnchor, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { CommunityUiItem } from './community-ui-item'
import { CommunityUiSocials } from './community-ui-socials'
import { CommunityUiAvatar } from './community-ui-avatar'

export function CommunityUiListItem({
  isAuthUser,
  item,
  to,
  username,
}: {
  isAuthUser: boolean
  item: Community
  to?: string
  username: string
}) {
  const hasRoles = item.roles?.length
  const rolesAssigned = item.roles?.filter((role) => role.member)
  const rolesAvailable = item.roles?.filter((role) => !role.member)
  const isAdmin = !!item?.membership?.admin

  return (
    <Paper withBorder p="md">
      <UiAnchor to={to ? to : undefined} underline="never" style={{ textDecoration: 'none' }}>
        <AspectRatio ratio={1.15}>
          <UiStack align="center" justify="center">
            <CommunityUiAvatar size="lg" community={item} />
            <Text size="xl" fw="bold">
              {item?.name}
            </Text>
            <AppUiDebugModal data={item} />
            {isAdmin && (
              <Button component={Link} to={item.viewUrl} variant="light">
                Manage Community
              </Button>
            )}
          </UiStack>
        </AspectRatio>
      </UiAnchor>
    </Paper>
  )
}
