import { type TextInputProps } from '@mantine/core'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { IconSearch } from '@tabler/icons-react'

export interface CollectionUiAssetSearchProps extends TextInputProps {
  setSearch: (val: string) => void
}

export function CollectionUiAssetSearch({ setSearch, ...props }: CollectionUiAssetSearchProps) {
  return <UiSearchField placeholder="Search" rightSection={<IconSearch size={16} />} setSearch={setSearch} {...props} />
}
