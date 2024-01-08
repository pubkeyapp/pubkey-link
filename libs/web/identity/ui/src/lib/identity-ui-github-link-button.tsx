import { Button, ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiGithubLinkButton({ ...props }: ButtonProps) {
  return (
    <Button
      bg="#333333"
      variant="filled"
      size="xl"
      leftSection={<IdentityUiIcon provider={IdentityProvider.GitHub} />}
      component={'a'}
      href="/api/auth/github"
      {...props}
    >
      Link GitHub Account
    </Button>
  )
}

export function IdentityUiTwitterLinkButton({ ...props }: ButtonProps) {
  return (
    <Button
      bg="#1DA1F2"
      variant="filled"
      size="xl"
      leftSection={<IdentityUiIcon provider={IdentityProvider.Twitter} />}
      component={'a'}
      href="/api/auth/twitter"
      {...props}
    >
      Link Twitter Account
    </Button>
  )
}
