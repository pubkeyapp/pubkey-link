import { ReactNode } from 'react'
import { Text, TextProps } from '@mantine/core'

export function UiDiscordRoleColor({
  children,
  color,
  ...props
}: Omit<TextProps, 'color'> & { children: ReactNode; color?: number | null }) {
  return color ? (
    <Text span style={{ color: color > 0 ? `#${color.toString(16).padStart(6, '0')}` : undefined }} {...props}>
      {children}
    </Text>
  ) : (
    children
  )
}
