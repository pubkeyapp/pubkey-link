import { useRoutes } from 'react-router-dom'
import { AdminRuleDetailFeature } from './admin-rule-detail.feature'
import { AdminRuleCreateFeature } from './admin-rule-create.feature'
import { AdminRuleListFeature } from './admin-rule-list.feature'

export default function AdminRuleRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <AdminRuleListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <AdminRuleCreateFeature communityId={communityId} />,
    },
    { path: ':ruleId/*', element: <AdminRuleDetailFeature /> },
  ])
}
