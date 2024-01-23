import { getRandomInt, Network } from '@pubkey-link/sdk'
import { UiAvatarProps } from '@pubkey-link/web-ui-core'
import { Avatar } from '@mantine/core'
import { getColorByIndex } from '@pubkey-ui/core'
import { IconCurrencySolana } from '@tabler/icons-react'

export type NetworkUiAvatarProps = UiAvatarProps & {
  network?: Network
}

export function NetworkUiAvatar({ network, ...props }: NetworkUiAvatarProps) {
  return (
    <Avatar radius="sm" color={getColorByIndex(getRandomInt(network?.name ?? ''))} {...props}>
      <IconCurrencySolana size={24} />
    </Avatar>
  )
}
