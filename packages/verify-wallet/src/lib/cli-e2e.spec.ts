import { Keypair } from '@solana/web3.js'
import { createChallengeCli } from './create-challenge-cli'
import { bs58Encode, constructSolanaMessage, ed25519Sign } from './helpers'
import { verifySignatureCli } from './verify-signature-cli'

describe('e2e', () => {
  it('should work ', () => {
    // ARRANGE
    const message = 'Test Message'
    const keypair = Keypair.generate()
    const publicKey = keypair.publicKey.toBase58()
    const challenge = createChallengeCli({ message, publicKey })

    // Signing the message
    const messageBytes = constructSolanaMessage(challenge)
    const signatureBytes = ed25519Sign({ message: messageBytes, privateKey: keypair.secretKey })
    const signature = bs58Encode(signatureBytes)

    // ACT
    const isValid = verifySignatureCli({ challenge, signature, publicKey })

    // ASSERT
    expect(createChallengeCli).toBeDefined()
    expect(verifySignatureCli).toBeDefined()
    expect(isValid).toBeTruthy()
  })

  it('should work with @solana/web3.js keypair', () => {
    // ARRANGE
    const message = 'Test Message'
    const keypair = Keypair.generate()
    const publicKey = keypair.publicKey.toBase58()
    const challenge = createChallengeCli({ message, publicKey })

    // Signing the message
    const messageBytes = constructSolanaMessage(challenge)
    const signatureBytes = ed25519Sign({ message: messageBytes, privateKey: keypair.secretKey })
    const signature = bs58Encode(signatureBytes)

    // ACT
    const isValid = verifySignatureCli({ challenge, signature, publicKey })

    // ASSERT
    expect(createChallengeCli).toBeDefined()
    expect(verifySignatureCli).toBeDefined()
    expect(isValid).toBeTruthy()
  })
})
