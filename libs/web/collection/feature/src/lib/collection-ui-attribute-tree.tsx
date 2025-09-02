import { ActionIcon, Badge, NavLink } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { CollectionAssetAttribute } from '@pubkey-link/sdk'
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'

function groupAttributesByKey(attributes: CollectionAssetAttribute[]): {
  key: string
  attributes: CollectionAssetAttribute[]
}[] {
  // First, group attributes into a Map for efficiency
  const groupedMap = attributes.reduce((map, attr) => {
    const key = attr.key
    const existing = map.get(key) || []
    map.set(key, [...existing, attr])
    return map
  }, new Map<string, CollectionAssetAttribute[]>())

  // Convert Map to array of { key, attributes } objects
  return Array.from(groupedMap, ([key, attributes]) => ({ key, attributes }))
}

export function CollectionUiAttributeTree({ attributes }: { attributes: CollectionAssetAttribute[] }) {
  const groups = groupAttributesByKey(attributes)

  const [selectedFilters, setSelectedFilters] = useQueryState('filters', parseAsArrayOf(parseAsString).withDefault([]))

  function handleAttributeClick(key: string, value: string) {
    const filterKey = `${key}:${value}`
    const isSelected = selectedFilters.includes(filterKey)

    if (isSelected) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== filterKey))
    } else {
      setSelectedFilters([...selectedFilters, filterKey])
    }
  }

  return groups.map((group) => {
    const selectedCount = selectedFilters.filter((filter) => filter.startsWith(`${group.key}:`)).length

    return (
      <NavLink
        key={group.key}
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{group.key}</span>
            {selectedCount > 0 && (
              <Badge size="sm" variant="filled" color="blue">
                {selectedCount}
              </Badge>
            )}
          </div>
        }
      >
        {group.attributes.map((attr) => {
          const filterKey = `${attr.key}:${attr.value}`
          const isSelected = selectedFilters.includes(filterKey)

          return (
            <NavLink
              key={filterKey}
              label={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>
                    {attr.value} ({attr.count})
                  </span>
                  {isSelected && (
                    <ActionIcon
                      size="xs"
                      variant="subtle"
                      color="gray"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAttributeClick(attr.key, attr.value ?? '')
                      }}
                    >
                      <IconX size={12} />
                    </ActionIcon>
                  )}
                </div>
              }
              active={isSelected}
              onClick={() => handleAttributeClick(attr.key, attr.value ?? '')}
              style={{ cursor: 'pointer' }}
            />
          )
        })}
      </NavLink>
    )
  })
}
