import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'

export default function DevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { value: 'new', label: 'New', component: <DevNew /> },
          { value: 'identity-wizard', label: 'Identity Wizard', component: <DevIdentityWizard /> },
        ]}
      />
    </UiContainer>
  )
}
