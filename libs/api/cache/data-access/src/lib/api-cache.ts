import { NetworkCluster } from '@prisma/client'
import { Resolver, ResolverContext } from '@pubkey-cache/resolver'
import { Storage } from 'unstorage'

export interface ApiCacheConfig {
  context: ResolverContext
  cluster: NetworkCluster
  resolvers: Resolver[]
  storage: Storage
}

export class ApiCache {
  constructor(private readonly config: ApiCacheConfig) {
    console.log(
      'ApiCache',
      this.config.resolvers.map((r) => r.address),
    )
  }

  get cluster() {
    return this.config.cluster
  }

  get resolvers() {
    return this.config.resolvers.map(({ address, id, type }) => ({ address, id, type }))
  }

  get storage() {
    return this.config.storage
  }
}
