import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { NetworkAsset, NetworkCluster, NetworkResolver, NetworkTokenType, Prisma } from '@prisma/client'
import { deepEqual } from 'fast-equals'
import { getDasApiAssetAttributes } from './get-das-api-asset-attributes'

export type NetworkAssetInput = Prisma.NetworkAssetCreateInput

export function convertDasApiAsset({
  asset,
  cluster,
  group,
}: {
  asset: DasApiAsset
  cluster: NetworkCluster
  group?: string
}): NetworkAssetInput {
  return {
    network: { connect: { cluster } },
    resolver: NetworkResolver.SolanaNonFungible,
    type: NetworkTokenType.NonFungible,
    account: asset.id,
    name: asset.content.metadata.name,
    symbol: asset.content.metadata.symbol,
    owner: asset.ownership.owner,
    group,
    decimals: 0,
    balance: '1',
    mint: asset.id,
    program: '',
    imageUrl: asset.content.files?.length ? asset.content.files[0].uri : '',
    metadata: asset.content.metadata as Prisma.InputJsonValue,
    attributes: getDasApiAssetAttributes(asset),
  }
}

export function isNetworkAssetEqual({ found, asset }: { found: NetworkAsset; asset: NetworkAssetInput }) {
  return deepEqual(getSummaryNetworkAsset(found), getSummaryNetworkAsset(asset))
}

const fields = [
  'account',
  'attributes',
  'balance',
  'decimals',
  'group',
  'imageUrl',
  'metadata',
  'mint',
  'name',
  'owner',
  'program',
  'resolver',
  'symbol',
  'type',
]
function getSummaryNetworkAsset(asset: Record<string, unknown>) {
  // Get all these fields from the asset and return them as an object, filtering null values
  return fields.reduce((acc, field) => {
    if (asset[field] !== null && asset[field] !== undefined) {
      acc[field] = asset[field] as unknown
    }
    return acc
  }, {} as Record<string, unknown>)
}

export function findNetworkAssetDiff({
  found,
  asset,
}: {
  found: Record<string, unknown>
  asset: Record<string, unknown>
}) {
  return fields.reduce((acc, field) => {
    if (asset[field] !== null && asset[field] !== undefined && asset[field] !== found[field]) {
      acc[field] = { found: found[field], asset: asset[field] }
    }
    return acc
  }, {} as Record<string, unknown>)
}
