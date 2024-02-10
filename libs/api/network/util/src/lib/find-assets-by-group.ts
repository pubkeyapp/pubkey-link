import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { NetworkAssetInput } from './convert-das-api-asset'
import { findAssetGroupValue } from './find-asset-group-value'

/**
 * Filter assets by optional list of collections (comma separated)
 * @param items DasApiAsset[] List of assets to filter
 * @param groups string[] Optional list of groups
 */
export function findAssetsByGroup(items: DasApiAsset[], groups: string[]) {
  return items.filter((item) => groups?.length === 0 || groups.includes(findAssetGroupValue(item) ?? ''))
}

/**
 * Filter assets by optional list of collections (comma separated)
 * @param items NetworkAssetInput[] List of assets to filter
 * @param groups string[] Optional list of groups
 */
export function findNetworkAssetsByGroup(items: NetworkAssetInput[], groups: string[]) {
  return items.filter((item) => groups?.length === 0 || groups.includes(item.group ?? ''))
}
