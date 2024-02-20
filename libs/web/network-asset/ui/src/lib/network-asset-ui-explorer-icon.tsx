import { ActionIcon, ActionIconProps, Button, ButtonProps, Tooltip } from '@mantine/core'
import { getNetworkAssetUrl, NetworkAsset } from '@pubkey-link/sdk'
import { IconExternalLink } from '@tabler/icons-react'

export function NetworkAssetUiExplorerIcon({ asset, ...props }: ActionIconProps & { asset: NetworkAsset }) {
  return (
    <Tooltip label="View on Explorer" withArrow>
      <ActionIcon size="sm" variant="light" component="a" href={getNetworkAssetUrl(asset)} target="_blank" {...props}>
        <IconExternalLink size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export function NetworkAssetUiExplorerButton({ asset, ...props }: ButtonProps & { asset: NetworkAsset }) {
  return (
    <Button
      size="xs"
      variant="light"
      component="a"
      href={getNetworkAssetUrl(asset)}
      target="_blank"
      leftSection={<IconExternalLink size={16} />}
      {...props}
    >
      View on Explorer
    </Button>
  )
}
