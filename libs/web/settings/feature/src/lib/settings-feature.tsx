import { Button } from '@mantine/core'
import { UiGrid } from '@pubkey-link/web-ui-core'
import { useUserProfile } from '@pubkey-link/web-user-data-access'
import { UserUiProfile, UserUiUpdateForm } from '@pubkey-link/web-user-ui'
import { UiCard, UiContainer, UiLoader, UiStack, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { SettingsIdentityDiscordFeature } from './settings-identity-feature'
import { SettingsWalletsFeature } from './settings-wallets-feature'

export default function SettingsFeature() {
  const { updateUser, user, query } = useUserProfile()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }

  return (
    <UiContainer>
      <UiStack>
        <UiGrid
          sidebar={
            <UiStack>
              <UserUiProfile
                user={user}
                action={
                  <Button size="xs" variant="light" component={Link} to={user.profileUrl}>
                    View profile
                  </Button>
                }
              />
            </UiStack>
          }
        >
          <UiTabRoutes
            tabs={[
              {
                label: 'Profile',
                path: 'profile',
                element: (
                  <UiStack>
                    <UiCard title="Profile">
                      <UserUiUpdateForm user={user} submit={updateUser} />
                    </UiCard>
                    <UiCard title="Discord">
                      <SettingsIdentityDiscordFeature />
                    </UiCard>
                  </UiStack>
                ),
              },
              {
                label: 'Wallets',
                path: 'wallets',
                element: (
                  <UiCard>
                    <SettingsWalletsFeature />
                  </UiCard>
                ),
              },
            ]}
          />
        </UiGrid>
      </UiStack>
    </UiContainer>
  )
}
