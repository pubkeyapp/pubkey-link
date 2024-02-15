import { Select, SelectProps } from '@mantine/core'
import { ComboboxItemGroup } from '@mantine/core/lib/components/Combobox/Combobox.types'

export function DiscordUiChannelSelect({ data, ...props }: SelectProps & { data: ComboboxItemGroup[] }) {
  return (
    <Select
      label="Channel"
      placeholder="Select or search channel..."
      data={data}
      searchable
      nothingFoundMessage="Nothing found..."
      {...props}
    />
  )
}
