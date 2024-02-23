import { ComboboxItem, MultiSelect, MultiSelectProps } from '@mantine/core'

export function DiscordUiRoleSelect({ roles, ...props }: MultiSelectProps & { roles: ComboboxItem[] }) {
  return (
    <MultiSelect
      label="Role"
      placeholder="Select or search role..."
      data={roles}
      searchable
      multiple
      nothingFoundMessage="Nothing found..."
      {...props}
    />
  )
}
