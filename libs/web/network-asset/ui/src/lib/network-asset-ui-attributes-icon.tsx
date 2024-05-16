import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { NetworkAsset } from '@pubkey-link/sdk'
import { UiInfoTable } from '@pubkey-ui/core'
import { Icon360 } from '@tabler/icons-react'

export function NetworkAssetUiAttributesIcon({ asset, ...props }: ActionIconProps & { asset: NetworkAsset }) {
  return (
    <Tooltip label="View Attributes" withArrow>
      <ActionIcon
        color="brand"
        variant="light"
        size="sm"
        onClick={() =>
          modals.open({
            size: 'xl',
            title: 'Attributes',
            children: <UiInfoTable items={asset.attributes} />,
          })
        }
        {...props}
      >
        <Icon360 size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
