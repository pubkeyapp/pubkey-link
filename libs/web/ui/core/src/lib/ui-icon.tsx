import {
  IconChecklist,
  IconDashboard,
  IconQuestionMark,
  IconSettings,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react'

export type UiIconType = 'community' | 'dashboard' | 'rules' | 'settings' | 'users'
export function UiIcon({ type, ...props }: { type: UiIconType | string; size?: number }) {
  switch (type) {
    case 'community':
      return <IconUsersGroup {...props} />
    case 'dashboard':
      return <IconDashboard {...props} />
    case 'rules':
      return <IconChecklist {...props} />
    case 'settings':
      return <IconSettings {...props} />
    case 'users':
      return <IconUsers {...props} />
    default:
      return <IconQuestionMark {...props} />
  }
}
