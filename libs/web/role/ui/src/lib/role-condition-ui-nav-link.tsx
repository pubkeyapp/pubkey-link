import { NavLink, NavLinkProps } from '@mantine/core'
import { NetworkTokenType } from '@pubkey-link/sdk'
import { RoleConditionUiItem } from './role-condition-ui-item'

export function RoleConditionUiNavLink({ type, ...props }: NavLinkProps & { type: NetworkTokenType }) {
  return <NavLink label={<RoleConditionUiItem type={type} />} variant={'light'} {...props} />
}
