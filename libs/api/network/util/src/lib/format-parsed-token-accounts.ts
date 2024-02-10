import { NetworkCluster, NetworkResolver, NetworkToken, NetworkTokenType } from '@prisma/client'
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { NetworkAssetInput } from './convert-das-api-asset'

export function formatParsedTokenAccounts({
  accounts,
  owner,
  cluster,
  tokenMap,
}: {
  cluster: NetworkCluster
  accounts: { pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }[]
  owner: string
  tokenMap: Record<string, NetworkToken>
}): NetworkAssetInput[] {
  return accounts.map(({ account, pubkey }) => {
    const balance = account.data.parsed.info.tokenAmount.uiAmount?.toString() ?? '0'
    const mint = account.data.parsed.info.mint
    const program = account.owner.toBase58()
    const token = tokenMap[mint.toString()]
    return {
      network: { connect: { cluster } },
      resolver: NetworkResolver.SolanaFungible,
      type: NetworkTokenType.Fungible,
      account: pubkey.toString(),
      name: token.name ?? '',
      symbol: token.symbol ?? '',
      imageUrl: token.imageUrl ?? undefined,
      owner,
      balance,
      group: mint,
      decimals: 0,
      mint,
      program,
    }
  })
}
