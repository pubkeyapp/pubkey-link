import { NetworkCluster } from '@prisma/client'
import { slugifyId } from './slugify-id'

export function getCollectionId(cluster: NetworkCluster, name: string) {
  const clusterName = cluster.toLocaleLowerCase().replace('solana', 'solana-')

  return `${clusterName}-${slugifyId(name)}`
}
