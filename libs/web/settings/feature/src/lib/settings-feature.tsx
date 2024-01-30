import { Button } from '@mantine/core'
import { UiGrid } from '@pubkey-link/web-ui-core'
import { useUserProfile } from '@pubkey-link/web-user-data-access'
import { UserUiProfile, UserUiUpdateForm } from '@pubkey-link/web-user-ui'
import { UiCard, UiContainer, UiLoader, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { SettingsIdentityFeature } from './settings-identity-feature'

export default function SettingsFeature() {
  const { updateUser, user, query } = useUserProfile()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }

  return (
    <UiContainer size="lg">
      <UiGrid
        sidebar={
          <UserUiProfile
            user={user}
            action={
              <Button size="xs" variant="light" component={Link} to={user.profileUrl}>
                View profile
              </Button>
            }
          />
        }
      >
        <UiTabRoutes
          tabs={[
            {
              path: 'profile',
              label: 'Edit profile',
              element: (
                <UiCard>
                  <UserUiUpdateForm user={user} submit={updateUser} />
                </UiCard>
              ),
            },
            {
              path: 'identities',
              label: 'Manage Identities',
              element: (
                <UiCard>
                  <SettingsIdentityFeature />
                </UiCard>
              ),
            },
          ]}
        />
      </UiGrid>
    </UiContainer>
  )
}
