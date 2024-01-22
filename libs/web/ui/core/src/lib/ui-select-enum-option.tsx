import { Select } from '@mantine/core'

export function UiSelectEnumOption<T>({
  value,
  onChange,
  options,
}: {
  value: T | undefined
  onChange: (value: T | undefined) => void
  options: { value: string; label: string }[]
}) {
  return (
    <Select
      value={value?.toString() ?? ''}
      onChange={(value) => onChange(value === '' ? undefined : (value as T))}
      data={options}
    />
  )
}
