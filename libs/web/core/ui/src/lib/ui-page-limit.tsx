import { Select, SelectProps } from '@mantine/core'

export function UiPageLimit({
  data = tableLimits,
  setPage,
  setLimit,
  limit,
}: {
  data?: SelectProps['data']
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  limit: number
}) {
  return (
    <Select
      style={{ width: 90 }}
      value={limit.toString()}
      onChange={(value) => {
        setPage(1)
        setLimit(parseInt(value ?? '10'))
      }}
      data={data}
    />
  )
}

export const tableLimits = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '200', label: '200' },
  { value: '500', label: '500' },
  { value: '1000', label: '1000' },
]
export const gridLimits = [
  { value: '3', label: '3' },
  { value: '6', label: '6' },
  { value: '9', label: '9' },
  { value: '12', label: '12' },
  { value: '15', label: '15' },
  { value: '18', label: '18' },
  { value: '21', label: '21' },
  { value: '24', label: '24' },
  { value: '99', label: '99' },
  { value: '999', label: '999' },
]
