import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, NetworkToken } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { formatParsedTokenAccounts, NetworkAssetInput } from '@pubkey-link/api-network-util'
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { ApiNetworkClusterService } from '../api-network-cluster.service'

@Injectable()
export class ApiNetworkResolverSolanaFungibleService {
  private readonly logger = new Logger(ApiNetworkResolverSolanaFungibleService.name)

  constructor(readonly core: ApiCoreService, readonly cluster: ApiNetworkClusterService) {}

  async resolve({
    cluster,
    owner,
    tokens,
  }: {
    cluster: NetworkCluster
    owner: string
    tokens: NetworkToken[]
  }): Promise<NetworkAssetInput[]> {
    this.logger.verbose(`resolveNetworkAssetSolanaFungible: Resolving assets for ${owner} on ${cluster}`)
    // Logic to resolve assets
    const address = new PublicKey(owner)
    const mints = tokens.map((token) => token.account)
    const tokenMap = tokens.reduce(
      (acc, curr) => ({ ...acc, [curr.account]: curr }),
      {} as Record<string, NetworkToken>,
    )
    return this.cluster.getConnection(cluster).then((conn) =>
      Promise.all([
        conn.getParsedTokenAccountsByOwner(address, { programId: TOKEN_PROGRAM_ID }).then((res) => res.value ?? []),
        conn
          .getParsedTokenAccountsByOwner(address, { programId: TOKEN_2022_PROGRAM_ID })
          .then((res) => res.value ?? []),
      ])
        .then(([tokenAccounts, token2022Accounts]) =>
          // Merge token and token2022 accounts
          [...tokenAccounts, ...token2022Accounts]
            // Filter by mints
            .filter((account) => mints.includes(account.account.data.parsed.info.mint.toString())),
        )
        .then((accounts) => formatParsedTokenAccounts({ accounts, owner, cluster, tokenMap })),
    )
  }
}
