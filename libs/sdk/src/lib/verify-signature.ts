import { PublicKey } from '@solana/web3.js'
import * as b58 from 'bs58'
import * as nacl from 'tweetnacl'
import { validateChallenge } from './validate-challenge'

export function verifySignature(
  publicKey: string,
  challenge: string,
  signature: string,
): { success: boolean; message?: string } {
  const verified = nacl.sign.detached.verify(
    Uint8Array.from(Buffer.from(challenge)),
    b58.decode(signature),
    new PublicKey(publicKey).toBuffer(),
  )
  if (!verified) {
    return { success: false, message: 'Signature verification failed' }
  }

  const validate = validateChallenge(challenge)
  if (!validate.success) {
    return { success: false, message: 'Challenge expired' }
  }

  return { success: true }
}
