import { Container, Divider, Group, Stack, Text } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { IdentityUiIconGroup } from '@pubkey-link/web-identity-ui'
import { UserUiAdminIcon, UserUiProfileItem } from '@pubkey-link/web-user-ui'
import { UiContainer, UiStack } from '@pubkey-ui/core'
import { UserProfileTabs } from './user-profile-tabs'

export function UserProfilePage({ isAuthUser, user }: { isAuthUser: boolean; user: User }) {
  return (
    <UiContainer size={'100%'}>
      <UiStack align="center">
        {/* <UserUiProfileItem user={user} isAuthUser={isAuthUser} my="md">
          {user.private && !isAuthUser ? null : (
            <Stack align="center" w="100%">
              <Divider label="Verified identities" mt="sm" w="50%" />
              <IdentityUiIconGroup identities={user.identities ?? []} />
            </Stack>
          )}
        </UserUiProfileItem> */}

        <Text size="xl" fw="bold">
          Welcome {user.name}!
        </Text>
        <Text size="lg">Discover, Join and Manage Communities</Text>
        <Container w="100%" miw="100%">
          <UserProfileTabs isAuthUser={isAuthUser} user={user} />
        </Container>
        <Group justify="center" gap="xs">
          <AppUiDebugModal data={{ user }} />
          <UserUiAdminIcon user={user} />
        </Group>
      </UiStack>
    </UiContainer>
  )
}
