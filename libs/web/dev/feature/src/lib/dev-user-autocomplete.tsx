import { SimpleGrid, Text } from '@mantine/core'
import type { User } from '@pubkey-link/sdk'
import { AdminUserUiSearch, UserUiAvatar, UserUiItem, UserUiSearch } from '@pubkey-link/web-user-ui'
import { UiCard, UiDebug, UiInfo, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function DevUserAutocomplete() {
  const [adminResult, setAdminResult] = useState<User | undefined>(undefined)
  const [userResult, setUserResult] = useState<User | undefined>(undefined)

  return (
    <UiStack>
      <UiCard>
        <UiStack>
          <UiInfo title="AdminUserUiSearch" message="Search for a user as an admin (all users will be shown)" />
          <AdminUserUiSearch select={setAdminResult} />
          {adminResult ? <ShowUserItems user={adminResult} /> : null}
        </UiStack>
      </UiCard>
      <UiCard>
        <UiStack>
          <UiInfo title="UserUiSearch" message="Search for a user as a normal user. Only active users are shown" />
          <UserUiSearch select={setUserResult} />
          {userResult ? <ShowUserItems user={userResult} /> : null}
        </UiStack>
      </UiCard>
    </UiStack>
  )
}

function ShowUserItems({ user }: { user: User }) {
  return (
    <UiStack>
      <SimpleGrid cols={3}>
        <UiCard
          title={
            <Text size="sm" c="dimmed">
              UserUiTitle with link
            </Text>
          }
        >
          <UserUiItem user={user} to={user.profileUrl} />
        </UiCard>
        <UiCard
          title={
            <Text size="sm" c="dimmed">
              UserUiTitle
            </Text>
          }
        >
          <UserUiItem user={user} />
        </UiCard>
        <UiCard
          title={
            <Text size="sm" c="dimmed">
              UserUiAvatar
            </Text>
          }
        >
          <UserUiAvatar user={user} />
        </UiCard>
      </SimpleGrid>
      <UiDebug data={user} />
    </UiStack>
  )
}
