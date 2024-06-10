import { bs58Encode, encodeMessage } from './helpers'
import { SignedChallenge } from './signed-challenge'

export interface CreateSignatureWallet {
  challenge: string
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}

export async function createSignatureWallet({
  challenge,
  signMessage,
}: CreateSignatureWallet): Promise<SignedChallenge> {
  const message = encodeMessage(challenge)
  const signature = await signMessage(message)

  return { message: bs58Encode(message), signature: bs58Encode(signature) }
}
