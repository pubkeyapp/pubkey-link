import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { Logger } from '@nestjs/common'

export function getDasApiAssetAttributes(asset: DasApiAsset): [string, string][] {
  const attributes = asset.content.metadata.attributes?.length ? asset.content.metadata.attributes : []
  if (typeof attributes?.filter !== 'function') {
    Logger.error(
      `Invalid attributes for asset ${asset.id}: ${JSON.stringify(asset.content.metadata)}`,
      'getDasApiAssetAttributes',
    )
    return []
  }
  return attributes.length
    ? (attributes
        .filter((s) => s.trait_type?.length && s.value?.length)
        .map((s) => [s.trait_type?.toString(), s.value?.toString()]) as [string, string][])
    : []
}
