import { ActionIcon, ActionIconProps } from '@mantine/core'
import { getNetworkTokenUrl, NetworkToken } from '@pubkey-link/sdk'
import { IconExternalLink } from '@tabler/icons-react'

export function NetworkTokenUiExplorerIcon({ token, ...props }: ActionIconProps & { token: NetworkToken }) {
  return (
    <ActionIcon size="sm" variant="light" component="a" href={getNetworkTokenUrl(token)} target="_blank" {...props}>
      <IconExternalLink size={16} />
    </ActionIcon>
  )
}
