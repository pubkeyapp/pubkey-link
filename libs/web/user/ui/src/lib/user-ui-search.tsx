import { useUserFindManyUser } from '@pubkey-link/web-user-data-access'
import { UserUiAutocomplete, type UserUiAutocompleteProps } from './user-ui-autocomplete'

export type UserUiSearchProps = Omit<UserUiAutocompleteProps, 'items' | 'isLoading' | 'setSearch'>

export function UserUiSearch({ select, ...props }: UserUiSearchProps) {
  const { items, query, setSearch } = useUserFindManyUser({ limit: 5 })

  return (
    <UserUiAutocomplete isLoading={query.isLoading} select={select} items={items} setSearch={setSearch} {...props} />
  )
}
