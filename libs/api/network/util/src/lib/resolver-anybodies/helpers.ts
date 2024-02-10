import { AnybodiesVaultMap, AnybodiesVaultResponse } from './types'

export function formatResponse(res: AnybodiesVaultResponse): AnybodiesVaultMap {
  return res?.map((item) => ({
    accounts: item.Tokens?.map((t) => t.mintAddress),
    owner: item._id,
  }))
}
