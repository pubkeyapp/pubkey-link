import { AdminFindManyNetworkAssetInput, NetworkCluster } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCluster = NetworkCluster.SolanaDevnet
// TODO: Figure out how to test this
// We depend on Solana Network state to be able to test this

xdescribe('api-network-asset-feature', () => {
  describe('api-network-asset-admin-resolver', () => {
    let networkAssetId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should find a list of networkAssets (find all)', async () => {
        const input: AdminFindManyNetworkAssetInput = {
          cluster: defaultCluster,
        }

        const res = await sdk.adminFindManyNetworkAsset({ input }, { cookie })
        networkAssetId = res.data.paging.data[0].id ?? 'test'
        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkAssetId)
      })

      it('should find a list of networkAssets (find new one)', async () => {
        const input: AdminFindManyNetworkAssetInput = {
          cluster: defaultCluster,
          search: networkAssetId,
        }

        const res = await sdk.adminFindManyNetworkAsset({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkAssetId)
      })

      it('should find a network-asset by id', async () => {
        const res = await sdk.adminFindOneNetworkAsset({ networkAssetId }, { cookie })

        expect(res.data.item.id).toBe(networkAssetId)
      })

      it('should delete a network-asset', async () => {
        const res = await sdk.adminDeleteNetworkAsset({ networkAssetId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyNetworkAsset(
          { input: { cluster: defaultCluster, search: networkAssetId } },
          { cookie },
        )
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not find a list of networkAssets (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyNetworkAsset(
            {
              input: {
                cluster: defaultCluster,
              },
            },
            { cookie },
          )
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
