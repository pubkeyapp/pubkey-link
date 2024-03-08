import { Text, TextProps } from '@mantine/core'
import { RoleCondition } from '@pubkey-link/sdk'

export function RoleConditionUiAmount({ condition, ...props }: TextProps & { condition: RoleCondition }) {
  return (
    <Text size="xs" ff="mono" c="dimmed" {...props}>
      Amount: {condition.amount}
      {parseInt(condition?.amountMax ?? '0') > 0 ? ` - ${condition.amountMax}` : ' or more'}
    </Text>
  )
}
