import { Button, type ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityProviderSolanaLogin } from '@pubkey-link/web-identity-data-access'
import { SolanaClusterProvider } from '@pubkey-link/web-solana-data-access'
import { IconCurrencySolana } from '@tabler/icons-react'
import { getIdentityProviderColor } from './get-identity-provider-color'
import { IdentityUiSolanaLoginWizard } from './identity-ui-solana-login-wizard'

export function IdentityUiSolanaLoginButton({ refresh, ...props }: ButtonProps & { refresh: () => void }) {
  return (
    <Button
      bg={getIdentityProviderColor(IdentityProvider.Solana)}
      size="xl"
      leftSection={<IconCurrencySolana size={28} />}
      onClick={() => {
        modals.open({
          title: 'Sign in with Solana',
          centered: true,
          children: (
            <SolanaClusterProvider autoConnect={true}>
              <IdentityProviderSolanaLogin refresh={refresh}>
                <IdentityUiSolanaLoginWizard
                  py="xl"
                  px="md"
                  refresh={() => {
                    refresh()
                    modals.closeAll()
                  }}
                />
              </IdentityProviderSolanaLogin>
            </SolanaClusterProvider>
          ),
          size: 'xl',
          zIndex: 1,
        })
      }}
      {...props}
    >
      Sign in with Solana
    </Button>
  )
}
