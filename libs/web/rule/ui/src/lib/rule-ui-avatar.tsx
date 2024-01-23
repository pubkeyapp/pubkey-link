import { Rule } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'

export type RuleUiAvatarProps = UiAvatarProps & {
  rule?: Rule
}

export function RuleUiAvatar({ rule, ...props }: RuleUiAvatarProps) {
  return <UiAvatar avatarUrl={undefined} name={rule?.name} {...props} />
}
