import { Button, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ellipsify, Identity, IdentityProvider } from '@pubkey-link/sdk'
import { IdentityProviderSolanaLink } from '@pubkey-link/web-identity-data-access'
import { SolanaClusterProvider } from '@pubkey-link/web-solana-data-access'
import { IconAlertCircle } from '@tabler/icons-react'
import { IdentityUiSolanaVerifyWizard } from './identity-ui-solana-verify-wizard'

export function IdentityUiSolanaVerifyButton({ identity, refresh }: { identity: Identity; refresh: () => void }) {
  return identity.provider === IdentityProvider.Solana ? (
    <Tooltip label={`Verify ${ellipsify(identity.providerId)} by signing a message with your wallet.`}>
      <Button
        size="xs"
        variant="light"
        color="yellow"
        leftSection={<IconAlertCircle size={14} />}
        onClick={() => {
          modals.open({
            title: 'Verify Identity',
            zIndex: 1,
            size: 'xl',
            children: (
              <SolanaClusterProvider autoConnect={true}>
                <IdentityProviderSolanaLink refresh={refresh}>
                  <IdentityUiSolanaVerifyWizard
                    identity={identity}
                    refresh={() => {
                      refresh()
                      modals.closeAll()
                    }}
                  />
                </IdentityProviderSolanaLink>
              </SolanaClusterProvider>
            ),
          })
        }}
      >
        Verify Identity
      </Button>
    </Tooltip>
  ) : null
}
