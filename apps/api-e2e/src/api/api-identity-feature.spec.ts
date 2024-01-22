import { IdentityProvider } from '@pubkey-link/sdk'
import * as bs58 from 'bs58'
import { alice, getAliceCookie, getIdentityChallenge, sdk, signMessage } from '../support'
import { breakStringSolana } from '../support/break-string'

describe('api-identity-feature', () => {
  describe('api-identity-user-resolver', () => {
    it('should run getIdentityVerificationChallenge', async () => {
      const res = await getIdentityChallenge(alice)

      expect(res.data?.challenge.provider).toEqual(IdentityProvider.Solana)
      expect(res.data?.challenge.providerId).toEqual(alice.solana.publicKey)
      expect(res.data?.challenge.challenge).toBeDefined()
      expect(res.data?.challenge.signature).toBeNull()
      expect(res.data?.challenge.verified).toBe(false)
    })

    it('should fail getIdentityVerificationChallenge with wrong provider', async () => {
      const cookie = await getAliceCookie()
      expect.assertions(1)

      try {
        await sdk.userRequestIdentityChallenge(
          { input: { provider: IdentityProvider.Discord, providerId: alice.solana.publicKey } },
          { cookie },
        )
      } catch (e) {
        expect(e.message).toEqual('Identity provider Discord not supported')
      }
    })

    it('should fail getIdentityVerificationChallenge with wrong providerId', async () => {
      const cookie = await getAliceCookie()
      expect.assertions(1)

      try {
        await sdk.userRequestIdentityChallenge(
          { input: { provider: IdentityProvider.Solana, providerId: 'test' } },
          { cookie },
        )
      } catch (e) {
        expect(e.message).toEqual('Invalid Solana public key.')
      }
    })

    it('should run verifyIdentityChallenge', async () => {
      const prepare = await getIdentityChallenge(alice)

      const challenge = prepare.data?.challenge.challenge as string
      const signature = await signMessage(alice, challenge)

      // Sign the challenge
      const cookie = await getAliceCookie()
      const res = await sdk.userVerifyIdentityChallenge(
        {
          input: {
            provider: IdentityProvider.Solana,
            providerId: alice.solana.publicKey,
            challenge,
            signature: bs58.encode(signature),
          },
        },
        { cookie },
      )

      expect(res.data?.verified.provider).toEqual(IdentityProvider.Solana)
      expect(res.data?.verified.providerId).toEqual(alice.solana.publicKey)
      expect(res.data?.verified.challenge).toBeDefined()
      expect(res.data?.verified.signature).toBeDefined()
      expect(res.data?.verified.verified).toBe(true)
    })

    it('should fail verifyIdentityChallenge with wrong challenge', async () => {
      const prepare = await getIdentityChallenge(alice)

      const challenge = prepare.data?.challenge.challenge as string
      const signature = await signMessage(alice, challenge)

      // Sign the challenge
      const cookie = await getAliceCookie()
      expect.assertions(1)
      try {
        await sdk.userVerifyIdentityChallenge(
          {
            input: {
              provider: IdentityProvider.Solana,
              providerId: alice.solana.publicKey,
              challenge: challenge.replace('A', 'B'),
              signature: bs58.encode(signature),
            },
          },
          { cookie },
        )
      } catch (e) {
        expect(e.message).toContain('Identity challenge not found.')
      }
    })

    it('should fail verifyIdentityChallenge with wrong signature', async () => {
      const prepare = await getIdentityChallenge(alice)

      const challenge = prepare.data?.challenge.challenge as string
      const signature = await signMessage(alice, challenge)

      // Sign the challenge
      const cookie = await getAliceCookie()
      expect.assertions(1)
      try {
        await sdk.userVerifyIdentityChallenge(
          {
            input: {
              provider: IdentityProvider.Solana,
              providerId: alice.solana.publicKey,
              challenge,
              // Break the signature
              signature: breakStringSolana(bs58.encode(signature)),
            },
          },
          { cookie },
        )
      } catch (e) {
        expect(e.message).toContain('Signature verification failed')
      }
    })

    it('should link a new Solana identity', async () => {
      //
      // const keypair = new Keypair()
    })
  })
})
