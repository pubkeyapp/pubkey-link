import { encode } from 'bs58'

import { createChallenge } from './create-challenge'
import { ed25519GetPublicKey, ed25519RandomPrivateKey } from './ed25519-helpers.js'

describe('create-challenge', () => {
  it('should be implemented', () => {
    // ARRANGE
    const message = 'Test Message'
    const privateKey = ed25519RandomPrivateKey()
    const publicKeyBytes = ed25519GetPublicKey(privateKey)
    const publicKey = encode(publicKeyBytes)

    // ACT
    createChallenge({ message, publicKey })

    // ASSERT
    expect(createChallenge).toBeDefined()
  })
})
