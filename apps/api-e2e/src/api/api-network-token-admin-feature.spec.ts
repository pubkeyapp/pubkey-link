import {
  AdminCreateNetworkTokenInput,
  AdminFindManyNetworkTokenInput,
  AdminUpdateNetworkTokenInput,
  NetworkToken,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-network-token-feature', () => {
  describe('api-network-token-admin-resolver', () => {
    const networkTokenName = uniqueId('acme-network-token')
    let networkTokenId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateNetworkToken({ input: { name: networkTokenName } }, { cookie })
      networkTokenId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a network-token', async () => {
        const input: AdminCreateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }

        const res = await sdk.adminCreateNetworkToken({ input }, { cookie })

        const item: NetworkToken = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a network-token', async () => {
        const createInput: AdminCreateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie })
        const networkTokenId = createdRes.data.created.id
        const input: AdminUpdateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }

        const res = await sdk.adminUpdateNetworkToken({ networkTokenId, input }, { cookie })

        const item: NetworkToken = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of networkTokens (find all)', async () => {
        const createInput: AdminCreateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie })
        const networkTokenId = createdRes.data.created.id

        const input: AdminFindManyNetworkTokenInput = {}

        const res = await sdk.adminFindManyNetworkToken({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkTokenId)
      })

      it('should find a list of networkTokens (find new one)', async () => {
        const createInput: AdminCreateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie })
        const networkTokenId = createdRes.data.created.id

        const input: AdminFindManyNetworkTokenInput = {
          search: networkTokenId,
        }

        const res = await sdk.adminFindManyNetworkToken({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkTokenId)
      })

      it('should find a network-token by id', async () => {
        const createInput: AdminCreateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie })
        const networkTokenId = createdRes.data.created.id

        const res = await sdk.adminFindOneNetworkToken({ networkTokenId }, { cookie })

        expect(res.data.item.id).toBe(networkTokenId)
      })

      it('should delete a network-token', async () => {
        const createInput: AdminCreateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie })
        const networkTokenId = createdRes.data.created.id

        const res = await sdk.adminDeleteNetworkToken({ networkTokenId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyNetworkToken({ input: { search: networkTokenId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a network-token', async () => {
        expect.assertions(1)
        const input: AdminCreateNetworkTokenInput = {
          name: uniqueId('network-token'),
        }

        try {
          await sdk.adminCreateNetworkToken({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a network-token', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateNetworkToken({ networkTokenId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of networkTokens (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyNetworkToken({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a network-token by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneNetworkToken({ networkTokenId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a network-token', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteNetworkToken({ networkTokenId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
