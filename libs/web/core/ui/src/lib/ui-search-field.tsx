import { TextInput, TextInputProps } from '@mantine/core'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

export function UiSearchField({
  placeholder = 'Search...',
  setSearch,
  searchValue = '',
  ...props
}: TextInputProps & {
  setSearch: (query: string) => void
  searchValue?: string
}) {
  const [value, setValue] = useState<string>(searchValue)

  return (
    <TextInput
      style={{ flexGrow: 1 }}
      placeholder={placeholder}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          setSearch(value.trim())
        }
      }}
      {...props}
    />
  )
}
