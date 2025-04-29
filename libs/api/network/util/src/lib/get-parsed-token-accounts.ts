import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'

export async function getParsedTokenAccounts({
  address,
  connection,
  enabled,
  programId,
}: {
  address: PublicKey
  connection: Connection
  enabled: boolean
  programId: PublicKey
}): Promise<{ account: AccountInfo<ParsedAccountData>; pubkey: PublicKey }[]> {
  if (!enabled) {
    return []
  }
  return connection.getParsedTokenAccountsByOwner(address, { programId }).then((res) => res.value ?? [])
}
