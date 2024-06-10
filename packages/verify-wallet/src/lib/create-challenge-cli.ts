import { sha256 } from '@noble/hashes/sha256'

export function createChallengeCli({ message, publicKey }: { message: string; publicKey: string }) {
  const createdAt = Date.now()
  const challengeStr = JSON.stringify({ message, publicKey, createdAt })

  return Buffer.from(sha256(challengeStr)).toString('hex')
}
