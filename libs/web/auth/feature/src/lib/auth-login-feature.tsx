import { Button, Divider, Group } from '@mantine/core'
import { LoginInput } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { AuthUiForm, AuthUiShell } from '@pubkey-link/web-auth-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function AuthLoginFeature() {
  const { login, logout, refresh, user, appConfig, appConfigLoading, authEnabled, enabledProviders } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const redirect = location.state?.from?.pathname || '/dashboard'

  async function loginHandler(input: LoginInput) {
    setLoading(true)
    return login(input).then((res) => {
      if (res) {
        navigate(redirect)
      }
      setLoading(false)
      return !!res
    })
  }

  if (appConfigLoading || !appConfig) {
    return <UiLoader />
  }

  const { authPasswordEnabled, authRegisterEnabled } = appConfig

  return (
    <AuthUiShell
      authEnabled={authEnabled}
      enabledProviders={enabledProviders}
      refresh={() =>
        refresh().then((res) => {
          if (res) {
            navigate(redirect)
            return true
          }
          return false
        })
      }
      logout={logout}
      user={user}
      navigate={() => navigate(redirect)}
      loading={loading}
    >
      {authPasswordEnabled ? (
        <UiStack>
          <Divider label="Sign in with username and password" labelPosition="center" mt="lg" />
          <AuthUiForm submit={loginHandler}>
            <Group justify="space-between">
              <Button disabled={loading ?? !authRegisterEnabled} component={Link} to="/register" variant="default">
                Register
              </Button>
              <Button loading={loading} type="submit">
                Login
              </Button>
            </Group>
          </AuthUiForm>
        </UiStack>
      ) : null}
    </AuthUiShell>
  )
}
