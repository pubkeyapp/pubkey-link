import type { ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiProviderLoginButton } from './identity-ui-provider-login-button'
import { IdentityUiSolanaLoginButton } from './identity-ui-solana-login-button'

export function IdentityUiLoginButton({
  provider,
  refresh,
  ...props
}: ButtonProps & { provider: IdentityProvider; refresh: () => void }) {
  switch (provider) {
    case IdentityProvider.Discord:
    case IdentityProvider.GitHub:
    case IdentityProvider.Twitter:
      return <IdentityUiProviderLoginButton provider={provider} fullWidth {...props} />
    case IdentityProvider.Solana:
      return <IdentityUiSolanaLoginButton refresh={refresh} fullWidth {...props} />
    default:
      return null
  }
}
