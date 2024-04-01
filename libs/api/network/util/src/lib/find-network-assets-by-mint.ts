import { NetworkAssetInput } from './convert-das-api-asset'

/**
 * Filter assets by optional list of mints
 * @param items NetworkAssetInput[] List of assets to filter
 * @param mints string[] Optional list of groups
 */
export function findNetworkAssetsByMint(items: NetworkAssetInput[], mints: string[]) {
  return items.filter((item) => mints?.length === 0 || mints.includes(item.account ?? ''))
}
