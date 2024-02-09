import {
  AdminCreateNetworkAssetInput,
  AdminFindManyNetworkAssetInput,
  AdminUpdateNetworkAssetInput,
  NetworkAsset,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-network-asset-feature', () => {
  describe('api-network-asset-admin-resolver', () => {
    const networkAssetName = uniqueId('acme-network-asset')
    let networkAssetId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateNetworkAsset({ input: { name: networkAssetName } }, { cookie })
      networkAssetId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a network-asset', async () => {
        const input: AdminCreateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }

        const res = await sdk.adminCreateNetworkAsset({ input }, { cookie })

        const item: NetworkAsset = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a network-asset', async () => {
        const createInput: AdminCreateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }
        const createdRes = await sdk.adminCreateNetworkAsset({ input: createInput }, { cookie })
        const networkAssetId = createdRes.data.created.id
        const input: AdminUpdateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }

        const res = await sdk.adminUpdateNetworkAsset({ networkAssetId, input }, { cookie })

        const item: NetworkAsset = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of networkAssets (find all)', async () => {
        const createInput: AdminCreateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }
        const createdRes = await sdk.adminCreateNetworkAsset({ input: createInput }, { cookie })
        const networkAssetId = createdRes.data.created.id

        const input: AdminFindManyNetworkAssetInput = {}

        const res = await sdk.adminFindManyNetworkAsset({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkAssetId)
      })

      it('should find a list of networkAssets (find new one)', async () => {
        const createInput: AdminCreateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }
        const createdRes = await sdk.adminCreateNetworkAsset({ input: createInput }, { cookie })
        const networkAssetId = createdRes.data.created.id

        const input: AdminFindManyNetworkAssetInput = {
          search: networkAssetId,
        }

        const res = await sdk.adminFindManyNetworkAsset({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkAssetId)
      })

      it('should find a network-asset by id', async () => {
        const createInput: AdminCreateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }
        const createdRes = await sdk.adminCreateNetworkAsset({ input: createInput }, { cookie })
        const networkAssetId = createdRes.data.created.id

        const res = await sdk.adminFindOneNetworkAsset({ networkAssetId }, { cookie })

        expect(res.data.item.id).toBe(networkAssetId)
      })

      it('should delete a network-asset', async () => {
        const createInput: AdminCreateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }
        const createdRes = await sdk.adminCreateNetworkAsset({ input: createInput }, { cookie })
        const networkAssetId = createdRes.data.created.id

        const res = await sdk.adminDeleteNetworkAsset({ networkAssetId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyNetworkAsset({ input: { search: networkAssetId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a network-asset', async () => {
        expect.assertions(1)
        const input: AdminCreateNetworkAssetInput = {
          name: uniqueId('network-asset'),
        }

        try {
          await sdk.adminCreateNetworkAsset({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a network-asset', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateNetworkAsset({ networkAssetId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of networkAssets (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyNetworkAsset({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a network-asset by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneNetworkAsset({ networkAssetId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a network-asset', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteNetworkAsset({ networkAssetId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
