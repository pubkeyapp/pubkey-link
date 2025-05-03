import { NavLink } from '@mantine/core'
import { CollectionAssetAttribute } from '@pubkey-link/sdk'
import React from 'react'

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
  return groups.map((group) => (
    <NavLink key={group.key} label={group.key}>
      {group.attributes.map((attr) => (
        <NavLink key={`${attr.key}:${attr.value}`} label={`${attr.value} (${attr.count})`} />
      ))}
    </NavLink>
  ))
}
