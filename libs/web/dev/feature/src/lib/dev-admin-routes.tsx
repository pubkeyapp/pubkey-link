import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevAddressInput } from './dev-address-input'
import { DevBackup } from './dev-backup'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'
import { DevUserAutocomplete } from './dev-user-autocomplete'

export default function DevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { path: 'new', label: 'New', element: <DevNew /> },
          { path: 'backup', label: 'Backup', element: <DevBackup /> },
          { path: 'address-input', label: 'Address Input', element: <DevAddressInput /> },
          { path: 'identity-wizard', label: 'Identity Wizard', element: <DevIdentityWizard /> },
          { path: 'user-autocomplete', label: 'User Autocomplete', element: <DevUserAutocomplete /> },
        ]}
      />
    </UiContainer>
  )
}
