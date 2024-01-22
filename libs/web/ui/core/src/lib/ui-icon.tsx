import { IconDashboard, IconQuestionMark, IconSettings, IconUsersGroup } from '@tabler/icons-react'

export type UiIconType = 'community' | 'dashboard' | 'settings'
export function UiIcon({ type, ...props }: { type: UiIconType | string; size?: number }) {
  switch (type) {
    case 'community':
      return <IconUsersGroup {...props} />
    case 'dashboard':
      return <IconDashboard {...props} />
    case 'settings':
      return <IconSettings {...props} />
    default:
      return <IconQuestionMark {...props} />
  }
}
