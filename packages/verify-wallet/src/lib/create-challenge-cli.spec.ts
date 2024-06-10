import { Keypair } from '@solana/web3.js'
import { createChallengeCli } from './create-challenge-cli'

describe('create-challenge-cli', () => {
  it('should be implemented', () => {
    // ARRANGE
    const message = 'Test Message'
    const keypair = Keypair.generate()
    const publicKey = keypair.publicKey.toBase58()

    // ACT
    createChallengeCli({ message, publicKey })

    // ASSERT
    expect(createChallengeCli).toBeDefined()
  })
})
