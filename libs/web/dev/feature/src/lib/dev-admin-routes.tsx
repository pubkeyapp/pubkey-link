import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'
import { DevUserAutocomplete } from './dev-user-autocomplete'
import { DevAddressInput } from './dev-address-input'

export default function DevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { path: 'new', label: 'New', element: <DevNew /> },
          { path: 'address-input', label: 'Address Input', element: <DevAddressInput /> },
          { path: 'identity-wizard', label: 'Identity Wizard', element: <DevIdentityWizard /> },
          { path: 'user-autocomplete', label: 'User Autocomplete', element: <DevUserAutocomplete /> },
        ]}
      />
    </UiContainer>
  )
}
