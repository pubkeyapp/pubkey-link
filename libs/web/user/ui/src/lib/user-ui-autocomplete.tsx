import { Autocomplete, type AutocompleteProps, CloseIcon, Loader } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { IconUserSearch } from '@tabler/icons-react'

import { useRef, useState } from 'react'
import { UserUiAvatar } from './user-ui-avatar'

export interface UserUiAutocompleteProps extends AutocompleteProps {
  isLoading: boolean
  items: User[]
  setSearch: (val: string) => void
  select: (user: User | undefined) => void
}

export function UserUiAutocomplete({ isLoading, items, select, setSearch, ...props }: UserUiAutocompleteProps) {
  const timeoutRef = useRef<number>(-1)
  const [value, setValue] = useState('')
  const [user, setUser] = useState<User | undefined>(undefined)

  function handleChange(val: string) {
    window.clearTimeout(timeoutRef.current)
    setValue(val)
    setSearch(val)
    setUser(undefined)
    timeoutRef.current = window.setTimeout(() => {
      select(undefined)
      const user = items?.find((item) => item.username === val)
      if (user) {
        select(user)
        setUser(user)
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
      leftSection={user ? <UserUiAvatar user={user} size="sm" /> : <IconUserSearch />}
      rightSection={
        isLoading ? (
          <Loader size="1rem" />
        ) : value.length ? (
          <CloseIcon
            onClick={() => {
              setUser(undefined)
              setValue('')
              setSearch('')
              select(undefined)
            }}
          />
        ) : null
      }
      {...props}
    />
  )
}
