import { Button, type ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiProviderLoginButton({ provider, ...props }: ButtonProps & { provider: IdentityProvider }) {
  return (
    <Button
      variant="light"
      radius="md"
      size="xl"
      fullWidth
      component="a"
      href={`/api/auth/${provider.toLowerCase()}`}
      leftSection={<IdentityUiIcon provider={provider} size={28} />}
      {...props}
    >
      Sign in with {provider}
    </Button>
  )
}
