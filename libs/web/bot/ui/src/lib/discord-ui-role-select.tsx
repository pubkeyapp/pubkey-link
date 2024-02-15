import { ComboboxItem, Select, SelectProps } from '@mantine/core'

export function DiscordUiRoleSelect({ roles, ...props }: SelectProps & { roles: ComboboxItem[] }) {
  return (
    <Select
      label="Role"
      placeholder="Select or search role..."
      data={roles}
      searchable
      nothingFoundMessage="Nothing found..."
      {...props}
    />
  )
}
