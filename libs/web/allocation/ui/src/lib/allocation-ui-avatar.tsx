import { Allocation } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type AllocationUiAvatarProps = UiAvatarProps & {
  allocation?: Allocation
}

export function AllocationUiAvatar({ allocation, ...props }: AllocationUiAvatarProps) {
  return <UiAvatar url={undefined} name={allocation?.name} {...props} />
}
