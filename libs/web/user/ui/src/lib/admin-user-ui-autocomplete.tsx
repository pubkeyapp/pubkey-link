import { Autocomplete, type AutocompleteProps, CloseIcon, Loader } from '@mantine/core'
import type { User } from '@pubkey-link/sdk'
import { useAdminFindManyUser } from '@pubkey-link/web-user-data-access'
import { useRef, useState } from 'react'

export function AdminUserUiAutocomplete({
  selectUser,
  ...props
}: AutocompleteProps & { selectUser: (user: User | undefined) => void }) {
  const { items, query, setSearch } = useAdminFindManyUser({ limit: 5 })
  const timeoutRef = useRef<number>(-1)
  const [value, setValue] = useState('')

  function handleChange(val: string) {
    window.clearTimeout(timeoutRef.current)
    setValue(val)
    setSearch(val)
    timeoutRef.current = window.setTimeout(() => {
      selectUser(undefined)
      const user = items?.find((item) => item.username === val)
      if (user) {
        selectUser(user)
      }
    })
  }

  return (
    <Autocomplete
      label="Search"
      placeholder="Search for a user"
      value={value}
      data={items?.map((item) => item.username + '')}
      onChange={handleChange}
      rightSection={
        query.isLoading ? (
          <Loader size="1rem" />
        ) : value.length ? (
          <CloseIcon
            onClick={() => {
              setValue('')
              selectUser(undefined)
            }}
          />
        ) : null
      }
      {...props}
    />
  )
}
