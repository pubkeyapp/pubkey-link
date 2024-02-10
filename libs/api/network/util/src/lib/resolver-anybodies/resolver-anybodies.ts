import { formatResponse } from './helpers'
import { AnybodiesVaultMap, AnybodiesVaultOptions, AnybodiesVaultResponse, AnybodiesVaultSnapshot } from './types'

const endpoint = 'https://us-central1-nft-anybodies.cloudfunctions.net/API_V2_GetVaultStakedTokenData'

export async function getAnybodiesVaultResponse(options: AnybodiesVaultOptions): Promise<AnybodiesVaultResponse> {
  return fetch(options.endpoint ?? endpoint, {
    body: JSON.stringify({ data: { vaultId: options.vault } }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  }).then((res) => res.json() as Promise<AnybodiesVaultResponse>)
}

export async function getAnybodiesVaultMap(options: AnybodiesVaultOptions): Promise<AnybodiesVaultMap> {
  return getAnybodiesVaultResponse(options).then((res) => formatResponse(res))
}

export async function getAnybodiesVaultSnapshot(options: AnybodiesVaultOptions): Promise<AnybodiesVaultSnapshot> {
  return getAnybodiesVaultMap(options).then((tokens) =>
    tokens
      .flatMap(({ owner, accounts }) => accounts.map((account) => ({ account, owner })))
      .sort((a, b) => a.owner.localeCompare(b.owner)),
  )
}
