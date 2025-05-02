import { DAS } from 'helius-sdk'

export interface TraitCountMap {
  [trait: string]: Record<string, number>
}

export function createTraitCountMap(assets: DAS.GetAssetResponse[]): TraitCountMap {
  const traitMap: Record<string, Record<string, number>> = {}

  // Iterate through each asset
  assets.forEach((asset) => {
    const attributes = asset.content?.metadata.attributes ?? []

    // Iterate through each attribute in the asset
    attributes.forEach(({ trait_type, value }) => {
      // Initialize the trait_type in the map if it doesn't exist
      if (!traitMap[trait_type]) {
        traitMap[trait_type] = {}
      }

      // Increment the count for the specific value of the trait_type
      traitMap[trait_type][value] = (traitMap[trait_type][value] || 0) + 1
    })
  })

  return traitMap
}

// Function to sort assets by content.metadata.name
export function sortAssetsByName(assets: DAS.GetAssetResponse[]): DAS.GetAssetResponse[] {
  return [...assets].sort((a, b) => {
    function getNumber(name: string): number {
      const match = name.match(/#(\d+)/)

      return match ? parseInt(match[1], 10) : 0
    }
    return getNumber(a.content?.metadata?.name ?? '') - getNumber(b.content?.metadata?.name ?? '')
  })
}
