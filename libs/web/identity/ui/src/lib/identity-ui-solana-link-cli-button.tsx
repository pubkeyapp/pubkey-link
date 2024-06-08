import { Button, ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Identity, solanaPurple } from '@pubkey-link/sdk'
import { toastSuccess, UiInfo, UiStack } from '@pubkey-ui/core'
import { IconTerminal } from '@tabler/icons-react'
import { IdentityUiSolanaWizardCli } from './identity-ui-solana-wizard-cli'

export function IdentityUiSolanaLinkCliButton({
  identities = [],
  label,
  refresh,
  ...props
}: ButtonProps & {
  identities?: Identity[]
  refresh: () => void
  label?: string
}) {
  return (
    <Button
      size="xl"
      color={solanaPurple}
      variant="light"
      leftSection={<IconTerminal />}
      {...props}
      onClick={() => {
        modals.open({
          size: 'xl',
          title: 'Link Offline Wallet',
          centered: true,
          zIndex: 1,
          children: (
            <UiStack>
              <UiInfo
                title="Link Offline Wallet"
                message="You can link an offline wallet to your Solana account by signing an offline message."
              />
              <IdentityUiSolanaWizardCli
                refresh={() => {
                  refresh()
                  modals.closeAll()
                  toastSuccess('Linked offline wallet')
                }}
              />
            </UiStack>
          ),
        })
      }}
    >
      {label ?? 'Link Offline Wallet'}
    </Button>
  )
}
