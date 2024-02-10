import { NetworkAssetInput } from './convert-das-api-asset'

export function getNetworkAssetInputMap(assets: NetworkAssetInput[]): Record<string, NetworkAssetInput> {
  return assets.reduce((acc, curr) => ({ ...acc, [curr.account]: curr }), {} as Record<string, NetworkAssetInput>)
}
