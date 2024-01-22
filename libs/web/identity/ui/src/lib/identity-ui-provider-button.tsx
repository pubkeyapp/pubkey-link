import { Button, ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { getIdentityProviderColor } from './get-identity-provider-color'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiProviderButton({
  action,
  provider,
  ...props
}: ButtonProps & { action: 'link' | 'login'; provider: IdentityProvider }) {
  return (
    <Button
      bg={getIdentityProviderColor(provider)}
      variant="filled"
      size="xl"
      leftSection={<IdentityUiIcon provider={provider} />}
      component={'a'}
      href={`/api/auth/${provider.toLowerCase()}`}
      {...props}
    >
      {action === 'link' ? 'Link' : 'Sign in with'} {provider}
    </Button>
  )
}
