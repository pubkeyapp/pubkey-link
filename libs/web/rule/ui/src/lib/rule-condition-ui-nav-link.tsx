import { NavLink, NavLinkProps } from '@mantine/core'
import { RuleConditionType } from '@pubkey-link/sdk'
import { RuleConditionUiItem } from './rule-condition-ui-item'

export function RuleConditionUiNavLink({ type, ...props }: NavLinkProps & { type: RuleConditionType }) {
  return <NavLink label={<RuleConditionUiItem type={type} />} variant={'light'} {...props} />
}
