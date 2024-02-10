import { NavLink, NavLinkProps } from '@mantine/core'
import { NetworkTokenType } from '@pubkey-link/sdk'
import { RuleConditionUiItem } from './rule-condition-ui-item'

export function RuleConditionUiNavLink({ type, ...props }: NavLinkProps & { type: NetworkTokenType }) {
  return <NavLink label={<RuleConditionUiItem type={type} />} variant={'light'} {...props} />
}
