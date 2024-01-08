import { Select } from '@mantine/core'

export function UiPageLimit({
  setPage,
  setLimit,
  limit,
}: {
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
      data={[
        { value: '5', label: '5' },
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
        { value: '200', label: '200' },
        { value: '500', label: '500' },
        { value: '1000', label: '1000' },
      ]}
    />
  )
}
