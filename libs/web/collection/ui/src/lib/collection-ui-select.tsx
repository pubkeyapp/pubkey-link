import { ComboboxItem, Select, type SelectProps } from '@mantine/core'

export function CollectionUiSelect({ collections, ...props }: SelectProps & { collections: ComboboxItem[] }) {
  return <Select placeholder="Select collection..." data={collections} {...props} />
}
