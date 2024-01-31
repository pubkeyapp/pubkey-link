import { NavLink, NavLinkProps } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { NetworkTokenUiItem } from './network-token-ui-item'

export function NetworkTokenUiSelect({
  value,
  setValue,
  tokens,
}: {
  value?: NetworkToken | undefined
  setValue: (token: NetworkToken | undefined) => void
  tokens: NetworkToken[]
}) {
  return value ? (
    <NetworkTokenUiNavLink token={value} onClick={() => setValue(undefined)} active />
  ) : (
    <UiStack>
      {tokens.map((option) => (
        <NetworkTokenUiNavLink
          key={option.id}
          token={option}
          onClick={() => setValue(option)}
          active={option === value}
        />
      ))}
    </UiStack>
  )
}

function NetworkTokenUiNavLink({ token, ...props }: NavLinkProps & { token: NetworkToken }) {
  return <NavLink label={<NetworkTokenUiItem networkToken={token} />} variant={'light'} {...props} />
}
