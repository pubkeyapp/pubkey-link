import { Button, ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiDiscordLinkButton({ ...props }: ButtonProps) {
  return (
    <Button
      bg="#5865F2"
      variant="filled"
      size="xl"
      leftSection={<IdentityUiIcon provider={IdentityProvider.Discord} />}
      component={'a'}
      href="/api/auth/discord"
      {...props}
    >
      Link Discord Account
    </Button>
  )
}
