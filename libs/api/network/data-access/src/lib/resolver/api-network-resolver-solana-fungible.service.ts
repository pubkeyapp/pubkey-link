import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, NetworkToken } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { formatParsedTokenAccounts, getParsedTokenAccounts, NetworkAssetInput } from '@pubkey-link/api-network-util'
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

    const connection = await this.cluster.getConnection(cluster)
    return Promise.all([
      getParsedTokenAccounts({
        address,
        connection,
        enabled: tokens.some((token) => token.program === TOKEN_PROGRAM_ID.toBase58()),
        programId: TOKEN_PROGRAM_ID,
      }),
      getParsedTokenAccounts({
        address,
        connection,
        enabled: tokens.some((token) => token.program === TOKEN_2022_PROGRAM_ID.toBase58()),
        programId: TOKEN_2022_PROGRAM_ID,
      }),
    ]).then((results) => {
      // Flatten the results into a single array
      const accounts = results
        .flat()
        // Filter out accounts that are not in the mints array
        .filter((account) => mints.includes(account.account.data.parsed.info.mint))

      return formatParsedTokenAccounts({ accounts, owner, cluster, tokenMap })
    })
  }
}
