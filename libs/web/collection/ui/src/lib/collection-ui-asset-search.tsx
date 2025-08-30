import { type TextInputProps } from '@mantine/core'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { IconSearch } from '@tabler/icons-react'
import { useQueryState, parseAsString } from 'nuqs'

export function CollectionUiAssetSearch(props: Omit<TextInputProps, 'setSearch'>) {
  const [, setSearch] = useQueryState('search', parseAsString.withDefault(''))

  return <UiSearchField placeholder="Search" rightSection={<IconSearch size={16} />} setSearch={setSearch} {...props} />
}
