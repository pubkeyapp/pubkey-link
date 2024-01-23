import { AdminCreateNetworkInput, AdminFindManyNetworkInput, AdminUpdateNetworkInput, Network } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-network-feature', () => {
  describe('api-network-admin-resolver', () => {
    const networkName = uniqueId('acme-network')
    let networkId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateNetwork({ input: { name: networkName } }, { cookie })
      networkId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a network', async () => {
        const input: AdminCreateNetworkInput = {
          name: uniqueId('network'),
        }

        const res = await sdk.adminCreateNetwork({ input }, { cookie })

        const item: Network = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a network', async () => {
        const createInput: AdminCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.adminCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id
        const input: AdminUpdateNetworkInput = {
          name: uniqueId('network'),
        }

        const res = await sdk.adminUpdateNetwork({ networkId, input }, { cookie })

        const item: Network = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of networks (find all)', async () => {
        const createInput: AdminCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.adminCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const input: AdminFindManyNetworkInput = {}

        const res = await sdk.adminFindManyNetwork({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkId)
      })

      it('should find a list of networks (find new one)', async () => {
        const createInput: AdminCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.adminCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const input: AdminFindManyNetworkInput = {
          search: networkId,
        }

        const res = await sdk.adminFindManyNetwork({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkId)
      })

      it('should find a network by id', async () => {
        const createInput: AdminCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.adminCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const res = await sdk.adminFindOneNetwork({ networkId }, { cookie })

        expect(res.data.item.id).toBe(networkId)
      })

      it('should delete a network', async () => {
        const createInput: AdminCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.adminCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const res = await sdk.adminDeleteNetwork({ networkId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyNetwork({ input: { search: networkId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a network', async () => {
        expect.assertions(1)
        const input: AdminCreateNetworkInput = {
          name: uniqueId('network'),
        }

        try {
          await sdk.adminCreateNetwork({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a network', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateNetwork({ networkId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of networks (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyNetwork({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a network by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneNetwork({ networkId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a network', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteNetwork({ networkId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
