import { Text, Tooltip } from '@mantine/core'
import { Identity } from '@pubkey-link/sdk'
import { IconDiscountCheckFilled } from '@tabler/icons-react'

export function IdentityUiVerified({ item }: { item: Identity }) {
  return item.verified ? (
    <Tooltip label={`Verified ${item.provider} identity`} withArrow position="top">
      <Text c="blue" display="flex">
        <IconDiscountCheckFilled size={20} />
      </Text>
    </Tooltip>
  ) : null
}
