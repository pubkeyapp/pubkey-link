import { Keypair } from '@solana/web3.js'
import { encode } from 'bs58'
import { createChallenge } from './create-challenge'
import { ed25519GetPublicKey, ed25519RandomPrivateKey, ed25519Sign } from './ed25519-helpers'
import { constructSolanaMessage, verifySignature } from './verify-signature'

describe('e2e', () => {
  it('should work ', () => {
    // ARRANGE
    const message = 'Test Message'
    const privateKey = ed25519RandomPrivateKey()
    const publicKeyBytes = ed25519GetPublicKey(privateKey)
    const publicKey = encode(publicKeyBytes)
    const challenge = createChallenge({ message, publicKey })

    // Signing the message
    const messageBytes = constructSolanaMessage(challenge)
    const signatureBytes = ed25519Sign(messageBytes, privateKey)
    const signature = encode(signatureBytes)

    // ACT
    const isValid = verifySignature({ challenge, signature, publicKey })

    // ASSERT
    expect(createChallenge).toBeDefined()
    expect(verifySignature).toBeDefined()
    expect(isValid).toBeTruthy()
  })

  it('should work with @solana/web3.js keypair', () => {
    // ARRANGE
    const message = 'Test Message'
    const keypair = Keypair.generate()
    const publicKey = keypair.publicKey.toBase58()
    const challenge = createChallenge({ message, publicKey })

    // Signing the message
    const messageBytes = constructSolanaMessage(challenge)
    const signatureBytes = ed25519Sign(messageBytes, keypair.secretKey)
    const signature = encode(signatureBytes)

    // ACT
    const isValid = verifySignature({ challenge, signature, publicKey })

    // ASSERT
    expect(createChallenge).toBeDefined()
    expect(verifySignature).toBeDefined()
    expect(isValid).toBeTruthy()
  })
})
