import { Stack, type StackProps } from '@mantine/core'
import { type AppConfig, IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiLoginButton } from './identity-ui-login-button'

export function IdentityUiLoginButtons({
  appConfig,
  refresh,
  ...props
}: StackProps & { appConfig: AppConfig; refresh: () => void }) {
  const enabledProviders: IdentityProvider[] = [
    appConfig.authDiscordEnabled && IdentityProvider.Discord,
    appConfig.authGithubEnabled && IdentityProvider.GitHub,
    appConfig.authSolanaEnabled && IdentityProvider.Solana,
    appConfig.authTwitterEnabled && IdentityProvider.Twitter,
  ].filter(Boolean) as IdentityProvider[]

  return (
    <Stack {...props}>
      {enabledProviders.map((provider) => (
        <IdentityUiLoginButton key={provider} provider={provider} refresh={refresh} />
      ))}
    </Stack>
  )
}
