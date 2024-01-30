import { useRoutes } from 'react-router-dom'
import { DevConditionWizardDetail } from './dev-condition-wizard-detail'
import { DevConditionWizardList } from './dev-condition-wizard-list'

export function DevConditionWizard() {
  return useRoutes([
    { path: '', element: <DevConditionWizardList /> },
    { path: ':communityId/*', element: <DevConditionWizardDetail /> },
  ])
}
