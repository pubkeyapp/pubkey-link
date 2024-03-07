import { NetworkCluster } from '@prisma/client'
import { slugifyId } from '@pubkey-link/api-core-data-access'

export function getCollectionId(cluster: NetworkCluster, name: string) {
  const clusterName = cluster.toLocaleLowerCase().replace('solana', 'solana-')

  return `${clusterName}-${slugifyId(name)}`
}
