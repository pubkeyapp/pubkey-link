import { Snapshot } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'

export type SnapshotUiAvatarProps = UiAvatarProps & {
  snapshot?: Snapshot
}

export function SnapshotUiAvatar({ snapshot, ...props }: SnapshotUiAvatarProps) {
  return <UiAvatar avatarUrl={undefined} name={snapshot?.name} {...props} />
}
