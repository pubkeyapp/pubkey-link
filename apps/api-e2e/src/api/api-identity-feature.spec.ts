import { IdentityProvider } from '@pubkey-link/sdk'
import { encodeMessage, signWithKeypairCli } from '@pubkey-link/verify-wallet'
import { Keypair } from '@solana/web3.js'
import { alice } from '../fixtures'
import { breakStringSolana, getAliceCookie, getIdentityChallenge, sdk, signMessage } from '../support'

describe('api-identity-feature', () => {
  describe('api-identity-user-resolver', () => {
    it('should run getIdentityVerificationChallenge', async () => {
      const res = await getIdentityChallenge(alice)

      expect(res.data?.challenge.provider).toEqual(IdentityProvider.Solana)
      expect(res.data?.challenge.providerId).toEqual(alice.solana.publicKey.toString())
      expect(res.data?.challenge.challenge).toBeDefined()
      expect(res.data?.challenge.signature).toBeNull()
      expect(res.data?.challenge.verified).toBe(false)
    })

    it('should fail getIdentityVerificationChallenge with wrong provider', async () => {
      const aliceCookie = await getAliceCookie()
      expect.assertions(1)

      try {
        await sdk.userRequestIdentityChallenge(
          { input: { provider: IdentityProvider.Discord, providerId: alice.solana.publicKey.toString() } },
          { cookie: aliceCookie },
        )
      } catch (e) {
        expect(e.message).toEqual('Identity provider Discord not supported')
      }
    })

    it('should fail getIdentityVerificationChallenge with wrong providerId', async () => {
      const aliceCookie = await getAliceCookie()
      expect.assertions(1)

      try {
        await sdk.userRequestIdentityChallenge(
          { input: { provider: IdentityProvider.Solana, providerId: 'test' } },
          { cookie: aliceCookie },
        )
      } catch (e) {
        expect(e.message).toEqual('Invalid Solana public key.')
      }
    })

    it('should run verifyIdentityChallenge', async () => {
      const prepare = await getIdentityChallenge(alice)

      const challenge = prepare.data?.challenge.challenge as string
      const { message, signature } = signMessage(alice, challenge)
      const message2 = encodeMessage(challenge)
      console.log({
        challenge,
        message,
        message2,
        signature,
      })
      // Sign the challenge
      const aliceCookie = await getAliceCookie()
      const res = await sdk.userVerifyIdentityChallenge(
        {
          input: {
            provider: IdentityProvider.Solana,
            providerId: alice.solana.publicKey.toString(),
            challenge,
            message,
            signature,
          },
        },
        { cookie: aliceCookie },
      )

      expect(res.data?.verified.provider).toEqual(IdentityProvider.Solana)
      expect(res.data?.verified.providerId).toEqual(alice.solana.publicKey.toString())
      expect(res.data?.verified.challenge).toBeDefined()
      expect(res.data?.verified.signature).toBeDefined()
      expect(res.data?.verified.verified).toBe(true)
    })

    it('should fail verifyIdentityChallenge with wrong challenge', async () => {
      const prepare = await getIdentityChallenge(alice)

      const challenge = prepare.data?.challenge.challenge as string
      const { message, signature } = signMessage(alice, challenge)

      // Sign the challenge
      const aliceCookie = await getAliceCookie()
      expect.assertions(1)
      try {
        await sdk.userVerifyIdentityChallenge(
          {
            input: {
              provider: IdentityProvider.Solana,
              providerId: alice.solana.publicKey.toString(),
              challenge: challenge.replace('A', 'B'),
              message: message.replace('A', 'B'),
              signature,
            },
          },
          { cookie: aliceCookie },
        )
      } catch (e) {
        expect(e.message).toContain('Identity challenge not found.')
      }
    })

    it('should fail verifyIdentityChallenge with wrong signature', async () => {
      const prepare = await getIdentityChallenge(alice)

      const challenge = prepare.data?.challenge.challenge as string
      const { message, signature } = signMessage(alice, challenge)

      // Sign the challenge
      const aliceCookie = await getAliceCookie()
      expect.assertions(1)
      try {
        await sdk.userVerifyIdentityChallenge(
          {
            input: {
              provider: IdentityProvider.Solana,
              providerId: alice.solana.publicKey.toString(),
              challenge,
              message,
              // Break the signature
              signature: breakStringSolana(signature),
            },
          },
          { cookie: aliceCookie },
        )
      } catch (e) {
        expect(e.message).toContain('Identity challenge verification failed.')
      }
    })

    it('should link a new Solana identity (CLI)', async () => {
      const aliceCookie = await getAliceCookie()
      const keypair = Keypair.generate()
      const resChallenge = await sdk
        .userRequestIdentityChallengeCli(
          { input: { provider: IdentityProvider.Solana, providerId: keypair.publicKey.toString() } },
          { cookie: aliceCookie },
        )
        .then((res) => res.data.challenge)

      expect(resChallenge.challenge).toBeDefined()
      expect(resChallenge.signature).toBeNull()
      expect(resChallenge.verified).toBe(false)

      const signature = signWithKeypairCli({ keypair, challenge: resChallenge.challenge })

      const resVerify = await sdk
        .userVerifyIdentityChallengeCli(
          {
            input: {
              provider: IdentityProvider.Solana,
              providerId: keypair.publicKey.toString(),
              challenge: resChallenge.challenge,
              message: '',
              signature,
            },
          },
          { cookie: aliceCookie },
        )
        .then((res) => res.data.verified)

      console.log('resVerify', resVerify)
      expect(resVerify.verified).toBe(true)
      expect(resVerify.provider).toEqual(IdentityProvider.Solana)
      expect(resVerify.providerId).toEqual(keypair.publicKey.toString())
      expect(resVerify.challenge).toEqual(resChallenge.challenge)
      expect(resVerify.signature).toEqual(signature)
    })
  })
})
