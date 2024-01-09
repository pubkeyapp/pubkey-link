import { Button, useMantineTheme } from '@mantine/core'
import { App } from '@pubkey-link/sdk'
import { useUserFindManyApp, useUserFindOneApp } from '@pubkey-link/web-app-data-access'
import { UserAppUiUpdateForm } from '@pubkey-link/web-app-ui'
import { toastError, UiCard, UiError, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserAppDetailSettings({ app }: { app: App }) {
  const { colors } = useMantineTheme()
  const navigate = useNavigate()
  const { deleteApp } = useUserFindManyApp()
  const { item, isAppAdmin, query, updateApp } = useUserFindOneApp({ appId: app.id })
  const tabs: UiTabRoute[] = [
    {
      path: 'general',
      label: 'General',
      element: item ? (
        <UiStack>
          <UiCard>
            <UserAppUiUpdateForm submit={updateApp} app={item} />
          </UiCard>
          <UiCard style={{ border: `1px solid ${colors.red[6]}` }} title="Danger Zone">
            <Button
              color="red"
              variant="outline"
              onClick={() => {
                if (!window.confirm('Are you sure you want to delete this app?')) return
                deleteApp(item.id)
                  .then(() => navigate('/apps'))
                  .catch(toastError)
              }}
            >
              Delete App
            </Button>
          </UiCard>
        </UiStack>
      ) : null,
    },
    { path: 'members', label: 'Members', element: <div>Members</div> },
  ]

  return query.isLoading ? (
    <UiLoader />
  ) : item ? (
    isAppAdmin ? (
      <UiTabRoutes tabs={tabs} />
    ) : (
      <UiError message="You must be an admin to view this page." />
    )
  ) : (
    <UiError message="AppBot not found." />
  )
}
