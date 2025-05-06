import { Resolver } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type ResolverUiAvatarProps = UiAvatarProps & {
  resolver?: Resolver
}

export function ResolverUiAvatar({ resolver, ...props }: ResolverUiAvatarProps) {
  return <UiAvatar url={undefined} name={resolver?.name} {...props} />
}
