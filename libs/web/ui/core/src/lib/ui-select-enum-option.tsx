import { Select, SelectProps } from '@mantine/core'

export function UiSelectEnumOption<T>({
  value,
  setValue,
  options,
  ...props
}: Omit<SelectProps, 'onChange'> & {
  value: T | undefined
  setValue: (value: T | undefined) => void
  options: { value: string; label: string }[]
}) {
  return (
    <Select
      value={value?.toString() ?? ''}
      onChange={(value) => setValue(value === '' ? undefined : (value as T))}
      data={options}
      {...props}
    />
  )
}
