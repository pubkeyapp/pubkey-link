import { UserCreateNetworkInput, UserFindManyNetworkInput, UserUpdateNetworkInput, Network } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-network-feature', () => {
  describe('api-network-user-resolver', () => {
    const networkName = uniqueId('acme-network')
    let networkId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateNetwork({ input: { name: networkName } }, { cookie })
      networkId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a network', async () => {
        const input: UserCreateNetworkInput = {
          name: uniqueId('network'),
        }

        const res = await sdk.userCreateNetwork({ input }, { cookie })

        const item: Network = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a network', async () => {
        const createInput: UserCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.userCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id
        const input: UserUpdateNetworkInput = {
          name: uniqueId('network'),
        }

        const res = await sdk.userUpdateNetwork({ networkId, input }, { cookie })

        const item: Network = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of networks (find all)', async () => {
        const createInput: UserCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.userCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const input: UserFindManyNetworkInput = {}

        const res = await sdk.userFindManyNetwork({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkId)
      })

      it('should find a list of networks (find new one)', async () => {
        const createInput: UserCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.userCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const input: UserFindManyNetworkInput = {
          search: networkId,
        }

        const res = await sdk.userFindManyNetwork({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkId)
      })

      it('should find a network by id', async () => {
        const createInput: UserCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.userCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const res = await sdk.userFindOneNetwork({ networkId }, { cookie })

        expect(res.data.item.id).toBe(networkId)
      })

      it('should delete a network', async () => {
        const createInput: UserCreateNetworkInput = {
          name: uniqueId('network'),
        }
        const createdRes = await sdk.userCreateNetwork({ input: createInput }, { cookie })
        const networkId = createdRes.data.created.id

        const res = await sdk.userDeleteNetwork({ networkId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyNetwork({ input: { search: networkId } }, { cookie })
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
        const input: UserCreateNetworkInput = {
          name: uniqueId('network'),
        }

        try {
          await sdk.userCreateNetwork({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not update a network', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateNetwork({ networkId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a list of networks (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyNetwork({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a network by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneNetwork({ networkId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a network', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteNetwork({ networkId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})
