import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'
import { PublicKey } from '@solana/web3.js'

export function createLedgerPayload({ challenge, publicKey }: { challenge: string; publicKey: PublicKey | string }) {
  const createdAt = Date.now()
  const challengeStr = JSON.stringify({ challenge, publicKey, createdAt })
  const hashStr = sha256(challengeStr)
  const hexStr = bytesToHex(hashStr)

  return Buffer.from(hexStr, 'utf8')
}
