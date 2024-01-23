import { ReactNode } from 'react'

export function DiscordUiRoleColor({ children, color }: { children: ReactNode; color: number }) {
  return <span style={{ color: color > 0 ? `#${color.toString(16).padStart(6, '0')}` : undefined }}>{children}</span>
}
