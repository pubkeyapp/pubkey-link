import { Button } from '@mantine/core'
import { useUserProfile } from '@pubkey-link/web-user-data-access'
import { UserUiProfile, UserUiUpdateForm } from '@pubkey-link/web-user-ui'
import { UiCard, UiContainer, UiGridRoutes, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
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
    <UiContainer>
      <UiStack>
        <UserUiProfile
          user={user}
          action={
            <Button size="xs" variant="light" component={Link} to={user.profileUrl}>
              View profile
            </Button>
          }
        />

        <UiGridRoutes
          basePath={`/settings`}
          routes={[
            {
              label: 'Profile',
              path: 'profile',
              element: (
                <UiCard>
                  <UserUiUpdateForm user={user} submit={updateUser} />
                </UiCard>
              ),
            },
            {
              label: 'Identities',
              path: 'identities',
              element: (
                <UiCard>
                  <SettingsIdentityFeature />
                </UiCard>
              ),
            },
          ]}
        />
      </UiStack>
    </UiContainer>
  )
}
