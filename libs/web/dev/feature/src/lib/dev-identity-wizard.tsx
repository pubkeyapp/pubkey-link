import { Grid } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { verifyMessageSignature } from '@pubkey-link/verify-wallet'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useCreateSignature, useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiSolanaWizard, IdentityUiSolanaWizardModal } from '@pubkey-link/web-identity-ui'
import { toastError, toastSuccess, UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback } from 'react'

export function DevIdentityWizard() {
  const { user } = useAuth()
  const { items } = useUserFindManyIdentity({ username: user?.username as string })
  const { publicKey } = useWallet()
  const challenge = 'Sign this message to verify your wallet'
  const createSignature = useCreateSignature()

  const sign = useCallback(
    async (useLedger: boolean) => {
      if (!publicKey) {
        toastError({ message: 'No public key', title: 'Error signing message' })
        return false
      }

      const { message, signature } = await createSignature({
        challenge,
        publicKey: publicKey.toString(),
        useLedger,
      })

      if (!signature) {
        throw new Error('No signature')
      }

      const verified = verifyMessageSignature({
        message,
        publicKey,
        signature: signature,
      })

      if (!verified) {
        toastError({
          message: 'Failed to verify signature',
          title: 'Error signing message',
        })
        return false
      }

      toastSuccess({
        message: 'Successfully verified signature',
        title: 'Success signing message',
      })
      return !!signature
    },
    [challenge, createSignature, publicKey],
  )

  return (
    <Grid>
      <Grid.Col span={8}>
        <UiStack>
          <UiCard title="Identity Wizard">
            <IdentityUiSolanaWizard sign={sign} />
          </UiCard>
          <UiCard title="Identity Wizard Modal">
            <IdentityUiSolanaWizardModal
              sign={(useLedger) =>
                sign(useLedger).catch((err) => {
                  toastError({ message: `${err}`, title: 'Error signing message' })
                  return false
                })
              }
            >
              Verify your wallet
            </IdentityUiSolanaWizardModal>
          </UiCard>
        </UiStack>
      </Grid.Col>
      <Grid.Col span={4}>
        <UiDebug
          data={{
            providers: Object.keys(IdentityProvider),
            identities: items.map((i) => [i.provider, i.providerId]),
          }}
          open
          hideButton
        />
      </Grid.Col>
    </Grid>
  )
}
