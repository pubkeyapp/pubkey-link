import { Button, Divider } from '@mantine/core'
import type { User } from '@pubkey-link/sdk'
import { AdminUserUiAutocomplete, UserUiItem } from '@pubkey-link/web-user-ui'
import { toastSuccess, UiCard, UiDebug, UiGroup, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function DevUserAutocomplete() {
  const [user, setUser] = useState<User | undefined>(undefined)
  return (
    <UiCard title="UserAutocomplete">
      <UiStack>
        <AdminUserUiAutocomplete selectUser={setUser} />

        <Divider label="Your results will show up here" labelPosition="center" />
        {user && (
          <UiGroup>
            <UserUiItem pl="xs" user={user} />
            <Button onClick={() => toastSuccess(`You added user ${user?.username}`)}>Add</Button>
          </UiGroup>
        )}

        <UiDebug data={{ user }} open />
      </UiStack>
    </UiCard>
  )
}
