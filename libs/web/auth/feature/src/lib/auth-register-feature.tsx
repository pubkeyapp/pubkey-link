import { Button, Divider, Group } from '@mantine/core'
import { RegisterInput } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { AuthUiForm, AuthUiFull, AuthUiShell } from '@pubkey-link/web-auth-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AuthRegisterFeature() {
  const { logout, refresh, register, appConfig, appConfigLoading, user } = useAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  async function registerHandler(input: RegisterInput) {
    setLoading(true)
    return register(input).then((res) => {
      if (res) {
        navigate('/dashboard')
      }
      setLoading(false)
      return !!res
    })
  }

  if (appConfigLoading || !appConfig) {
    return <UiLoader />
  }

  if (!appConfig.authRegisterEnabled) {
    return (
      <AuthUiFull>
        <UiError message="Registration is not enabled." />
      </AuthUiFull>
    )
  }

  return (
    <AuthUiShell
      appConfig={appConfig}
      refresh={() =>
        refresh().then((res) => {
          if (res) {
            navigate('/dashboard')
            return true
          }
          return false
        })
      }
      logout={logout}
      user={user}
      navigate={() => navigate('/dashboard')}
      loading={loading}
    >
      <Divider label="Sign up with username and password" labelPosition="center" mt="lg" />
      <AuthUiForm submit={registerHandler}>
        <Group justify="space-between">
          <Button disabled={loading} component={Link} to="/login" variant="default">
            Login
          </Button>
          <Button loading={loading} type="submit">
            Register
          </Button>
        </Group>
      </AuthUiForm>
    </AuthUiShell>
  )
}
