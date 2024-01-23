import { useRoutes } from 'react-router-dom'
import { UserRuleDetailFeature } from './user-rule-detail.feature'
import { UserRuleCreateFeature } from './user-rule-create.feature'
import { UserRuleListFeature } from './user-rule-list.feature'

export default function UserRuleRoutes() {
  return useRoutes([
    { path: '', element: <UserRuleListFeature /> },
    {
      path: 'create',
      element: <UserRuleCreateFeature />,
    },
    { path: ':ruleId/*', element: <UserRuleDetailFeature /> },
  ])
}
