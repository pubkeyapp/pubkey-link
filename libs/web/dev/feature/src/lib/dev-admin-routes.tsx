import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'
import { DevUserAutocomplete } from './dev-user-autocomplete'

export default function DevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { value: 'new', label: 'New', component: <DevNew /> },
          { value: 'user-autocomplete', label: 'User Autocomplete', component: <DevUserAutocomplete /> },
          { value: 'identity-wizard', label: 'Identity Wizard', component: <DevIdentityWizard /> },
        ]}
      />
    </UiContainer>
  )
}
