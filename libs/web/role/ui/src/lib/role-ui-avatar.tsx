import { Role } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type RoleUiAvatarProps = UiAvatarProps & {
  role?: Role
}

export function RoleUiAvatar({ role, ...props }: RoleUiAvatarProps) {
  return <UiAvatar size="md" radius="sm" url={undefined} name={clean(`${role?.name ?? role?.id}`)} {...props} />
}

function clean(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '').trim()
}
