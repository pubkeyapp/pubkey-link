import { useAuth } from '@pubkey-link/web-auth-data-access'
import { AuthUiLogout, AuthUiPage } from '@pubkey-link/web-auth-ui'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { IdentityUiLoginButtons } from '@pubkey-link/web-identity-ui'
import { UiLoader } from '@pubkey-ui/core'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AuthLoginFeature() {
  const { appConfig, appConfigLoading, authEnabled, enabledProviders } = useAppConfig()
  const { logout, refresh, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function redirect() {
    navigate(location.state?.from?.pathname || '/dashboard')
  }

  if (appConfigLoading || !appConfig) {
    return <UiLoader />
  }

  return (
    <AuthUiPage authEnabled={authEnabled}>
      {user ? (
        <AuthUiLogout navigate={() => redirect()} logout={logout} user={user} />
      ) : (
        <IdentityUiLoginButtons
          mb="md"
          mt="md"
          enabledProviders={enabledProviders}
          refresh={() =>
            refresh().then((authenticated) => {
              if (authenticated) {
                redirect()
              }
            })
          }
        />
      )}
    </AuthUiPage>
  )
}
