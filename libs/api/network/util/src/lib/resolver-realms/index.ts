import { NetworkCluster, NetworkResolver, NetworkTokenType, Prisma } from '@prisma/client'
import { Logger } from '@nestjs/common'

export const REALMS_PROGRAM_ID = 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
const baseUrl = 'https://realms-api.com'

export type Realm = {
  authority: string
  council: string
  id: number
  mint: string
  name: string
  plugin: string
  program: string
  publicKey: string
}

export type RealmVoter = {
  deposit: string
  publicKey: string
  realm: string
  registrar: string
  voter: string
  weight: string
}

export async function getRealms() {
  return fetch(`${baseUrl}/realms`)
    .then((res) => res.json())
    .then((res) => res as Realm[])
    .catch((err) => {
      Logger.error(`Error fetching realms: ${err}`)
      return []
    })
}

export async function getRealm({ realm }: { realm: string }) {
  const realms = await getRealms()
  if (!realms.length) {
    return null
  }
  const found = realms.find((r) => r.publicKey === realm)
  if (!found) {
    return null
  }
  return found as unknown as Realm
}

async function getVotersForRealm({ realm }: { realm: string }) {
  return fetch(`${baseUrl}/voters/${realm}`)
    .then((res) => res.json())
    .then((res) => res as RealmVoter[])
    .catch((err) => {
      Logger.error(`Error fetching realms: ${err}`)
      return []
    })
}

export async function getRealmsVoters({ realms, owner }: { realms: string[]; owner: string }) {
  const res: Prisma.NetworkAssetCreateInput[] = []

  for (const realm of realms) {
    const voters = await getVotersForRealm({ realm })
    if (!voters.length) {
      continue
    }
    for (const voter of voters.filter((v) => v.voter === owner)) {
      res.push(convertVoterToNetworkAsset(voter))
    }
  }

  return res
}

function convertVoterToNetworkAsset(voter: RealmVoter): Prisma.NetworkAssetCreateInput {
  return {
    account: voter.publicKey,
    balance: voter.weight,
    decimals: 0,
    group: voter.realm,
    metadata: voter,
    // TODO: This might actually be the mint we're governing with....
    mint: voter.realm,
    name: 'Realms Voter Account',
    network: { connect: { cluster: NetworkCluster.SolanaMainnet } },
    owner: voter.voter,
    resolver: NetworkResolver.SolanaRealms,
    symbol: 'VOTER',
    type: NetworkTokenType.RealmsVoter,
  }
}
