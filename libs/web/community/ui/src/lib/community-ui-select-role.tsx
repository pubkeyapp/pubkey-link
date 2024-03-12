import { SelectProps } from '@mantine/core'
import { CommunityRole, getEnumOptions } from '@pubkey-link/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function CommunityUiSelectRole({
  label = 'Select Role',
  value,
  setValue,
  ...props
}: Omit<SelectProps, 'onChange'> & {
  label?: string
  value: CommunityRole | undefined
  setValue: (role: CommunityRole | undefined) => void
}) {
  return (
    <UiSelectEnum<CommunityRole>
      value={value}
      setValue={setValue}
      options={[...getEnumOptions(CommunityRole)]}
      {...props}
    />
  )
}
