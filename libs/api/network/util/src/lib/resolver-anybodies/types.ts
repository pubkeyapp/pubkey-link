export type AnybodiesVaultMap = { owner: string; accounts: string[] }[]
export type AnybodiesVaultSnapshot = { account: string; owner: string }[]
export type AnybodiesVaultResponse = {
  _id: string
  Tokens: { mintAddress: string }[]
}[]

export type AnybodiesVaultOptions = {
  vaultId: string
  endpoint?: string
}
