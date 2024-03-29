import { Select, TextInput } from '@mantine/core'
import { getEnumOptions, IdentityProvider } from '@pubkey-link/sdk'
import { VerifyIdentity } from '@pubkey-link/web-verify-ui'
import { UiCard, UiInfo, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function AdminVerifyIndexFeature() {
  const [provider, setProvider] = useState<IdentityProvider>(IdentityProvider.Discord)
  const [providerId, setProviderId] = useState<string>('')
  const providers = getEnumOptions(IdentityProvider)
  return (
    <UiStack>
      <UiInfo
        title="Verify an identity"
        message={
          <UiStack>
            <div>Enter an identity to verify.</div>
          </UiStack>
        }
      />
      <UiCard>
        <UiStack>
          <Select
            data={providers}
            label="Provider"
            value={provider}
            description="Select the provider to verify."
            onChange={(event) => setProvider(event as IdentityProvider)}
          />
          <TextInput
            label="Provider ID"
            value={providerId}
            description="Enter the provider ID to verify."
            onChange={(event) => setProviderId(event.currentTarget.value)}
          />
        </UiStack>
      </UiCard>
      {provider && providerId.length ? <VerifyIdentity provider={provider} providerId={providerId} /> : null}
    </UiStack>
  )
}
