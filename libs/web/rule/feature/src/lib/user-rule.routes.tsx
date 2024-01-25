import { Community } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { UserRuleCreateFeature } from './user-rule-create.feature'
import { UserRuleDetailFeature } from './user-rule-detail.feature'
import { UserRuleListFeature } from './user-rule-list.feature'

export default function UserRuleRoutes({ community }: { community: Community }) {
  return useRoutes([
    { path: '', element: <UserRuleListFeature community={community} /> },
    {
      path: 'create',
      element: <UserRuleCreateFeature community={community} />,
    },
    { path: ':ruleId/*', element: <UserRuleDetailFeature community={community} /> },
  ])
}
