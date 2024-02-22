import { getAliceCookie, getBobCookie } from '../support'

describe('api-network-feature', () => {
  describe('api-network-user-resolver', () => {
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
    })

    describe('authorized', () => {
      beforeAll(async () => {
        alice = await getAliceCookie()
      })

      it('should be implemented', async () => {
        expect(alice).toBeDefined()
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should be implemented', async () => {
        expect(bob).toBeDefined()
      })
    })
  })
})
