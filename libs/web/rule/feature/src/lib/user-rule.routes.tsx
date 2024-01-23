import { useRoutes } from 'react-router-dom'
import { UserRuleDetailFeature } from './user-rule-detail.feature'
import { UserRuleCreateFeature } from './user-rule-create.feature'
import { UserRuleListFeature } from './user-rule-list.feature'

export default function UserRuleRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <UserRuleListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <UserRuleCreateFeature communityId={communityId} />,
    },
    { path: ':ruleId/*', element: <UserRuleDetailFeature /> },
  ])
}
