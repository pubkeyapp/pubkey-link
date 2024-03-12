import { IdentityProvider, NetworkCluster } from '@pubkey-link/sdk'
import { IdentityUiItemById } from '@pubkey-link/web-identity-ui'
import { useUserFindOneNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { UiCard, UiDebug, UiError, UiInfoTable, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserNetworkAssetDetailOverviewTab({ account, cluster }: { account: string; cluster: NetworkCluster }) {
  const { item, query } = useUserFindOneNetworkAsset({ account, cluster })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="NetworkAsset not found." />
  }

  return (
    <UiStack>
      <UiCard title="Owner">
        <IdentityUiItemById provider={IdentityProvider.Solana} providerId={item.owner} />
      </UiCard>
      {item.attributes && (
        <UiCard title="Attributes">
          <UiInfoTable items={item.attributes} />
        </UiCard>
      )}
      <UiDebug data={item} />
    </UiStack>
  )
}
