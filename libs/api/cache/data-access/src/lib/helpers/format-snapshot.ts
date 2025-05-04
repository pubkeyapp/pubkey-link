import { Logger } from '@nestjs/common'
import { NetworkResolver, NetworkToken, NetworkTokenType, Prisma } from '@prisma/client'
import { ResolverType } from '@pubkey-cache/resolver'
import { NetworkAssetInput } from '@pubkey-link/api-network-util'
import { DAS } from 'helius-sdk'

export function formatSnapshot({
  items,
  networkToken,
  type,
}: {
  items: (DAS.GetAssetResponse | DAS.TokenAccounts)[]
  networkToken: NetworkToken
  type: ResolverType
}): Prisma.NetworkAssetCreateInput[] {
  switch (type) {
    case ResolverType['helius-collection-assets']:
      return (items as DAS.GetAssetResponse[]).map((asset) => convertHeliusAssetResponse({ asset, networkToken }))
    case ResolverType['helius-token-accounts']:
      return (items as DAS.TokenAccounts[]).map((item) => convertHeliusTokenAccounts({ item, networkToken }))
    default:
      return []
  }
}

function convertHeliusTokenAccounts({
  item,
  networkToken,
}: {
  item: DAS.TokenAccounts
  networkToken: NetworkToken
}): NetworkAssetInput {
  return {
    network: { connect: { cluster: networkToken.cluster } },
    resolver: NetworkResolver.SolanaFungible,
    type: NetworkTokenType.Fungible,
    account: item.address?.toString() ?? '',
    name: networkToken.name ?? '',
    symbol: networkToken.symbol ?? '',
    owner: item.owner ?? '',
    imageUrl: networkToken.imageUrl ?? '',
    balance: item.amount?.toString() ?? '0',
    group: item.mint ?? '',
    decimals: 0,
    mint: item.mint ?? '',
    program: networkToken.program ?? '',
  }
}

function convertHeliusAssetResponse({
  asset,
  networkToken,
}: {
  asset: DAS.GetAssetResponse
  networkToken: NetworkToken
}): NetworkAssetInput {
  return {
    network: { connect: { cluster: networkToken.cluster } },
    resolver: NetworkResolver.SolanaNonFungible,
    type: NetworkTokenType.NonFungible,
    account: asset.id,
    name: asset.content?.metadata.name ?? '',
    symbol: asset.content?.metadata.symbol,
    owner: asset.ownership.owner,
    group: networkToken.account,
    decimals: 0,
    balance: '1',
    burnt: asset.burnt,
    mint: asset.id,
    program: asset.token_info?.token_program,
    imageUrl: asset.content?.files?.length ? asset.content.files[0].uri : '',
    metadata: (asset.content?.metadata ?? {}) as Prisma.InputJsonValue,
    attributes: convertHeliusAssetResponseAttributes(asset),
  }
}

export function convertHeliusAssetResponseAttributes(asset: DAS.GetAssetResponse): [string, string][] {
  const attributes = asset.content?.metadata.attributes?.length ? asset.content?.metadata.attributes : []

  if (typeof attributes?.filter !== 'function') {
    Logger.error(
      `Invalid attributes for asset ${asset.id}: ${JSON.stringify(asset.content?.metadata)}`,
      'getDasApiAssetAttributes',
    )
    return []
  }

  const main = attributes.length
    ? (attributes
        .filter((s) => !!s)
        .filter((s) => s.trait_type?.length && s.value?.length)
        .map((s) => [s.trait_type?.toString(), s.value?.toString()]) as [string, string][])
    : []

  const attributesExt = getAdditionalMetadata(asset)
  const ext = attributesExt.length ? attributesExt : []

  return [...main, ...ext]
}

// Get the Token2022 additional metadata from the mint extensions
function getAdditionalMetadata(asset: DAS.GetAssetResponse): [string, string][] {
  if (
    asset.mint_extensions &&
    asset.mint_extensions['metadata'] &&
    asset.mint_extensions['metadata']['additionalMetadata']
  ) {
    const pairs = asset.mint_extensions['metadata']['additionalMetadata'] as unknown as [string, string][]
    // Only return any items if they have a value with a length
    return pairs.filter((pair) => pair[1]?.length)
  }
  return []
}
