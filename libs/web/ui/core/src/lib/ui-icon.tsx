import {
  IconCameraBolt,
  IconChecklist,
  IconDashboard,
  IconQuestionMark,
  IconSettings,
  IconTimelineEventText,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react'

export type UiIconType = 'community' | 'dashboard' | 'logs' | 'roles' | 'settings' | 'snapshot' | 'users'

export function UiIcon({ type, ...props }: { type: UiIconType | string; size?: number }) {
  switch (type) {
    case 'community':
      return <IconUsersGroup {...props} />
    case 'dashboard':
      return <IconDashboard {...props} />
    case 'logs':
      return <IconTimelineEventText {...props} />
    case 'roles':
      return <IconChecklist {...props} />
    case 'settings':
      return <IconSettings {...props} />
    case 'snapshot':
      return <IconCameraBolt {...props} />
    case 'users':
      return <IconUsers {...props} />
    default:
      return <IconQuestionMark {...props} />
  }
}
