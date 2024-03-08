import { NetworkCluster, UserFindManyNetworkAssetInput } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCluster = NetworkCluster.SolanaMainnet
const defaultUser = 'alice'

// TODO: Figure out how to test this
// We depend on Solana Network state to be able to test this
xdescribe('api-network-asset-feature', () => {
  describe('api-network-asset-user-resolver', () => {
    let networkAssetId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
    })

    describe('authorized', () => {
      it('should find a list of networkAssets (find all)', async () => {
        const input: UserFindManyNetworkAssetInput = { cluster: defaultCluster, username: defaultUser }

        const res = await sdk.userFindManyNetworkAsset({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(0)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(0)
      })

      it('should find a list of networkAssets (find new one)', async () => {
        const input: UserFindManyNetworkAssetInput = {
          cluster: defaultCluster,
          username: defaultUser,
          search: networkAssetId,
        }

        const res = await sdk.userFindManyNetworkAsset({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(0)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(0)
        expect(res.data.paging.data[0].id).toBe(networkAssetId)
      })

      it('should find a network-asset by id', async () => {
        const res = await sdk.userFindOneNetworkAsset(
          {
            cluster: defaultCluster,
            account: '',
          },
          { cookie: alice },
        )

        expect(res.data.item.id).toBe(networkAssetId)
      })
    })

    describe('unauthorized', () => {
      it('should not find a list of networkAssets (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyNetworkAsset(
            {
              input: {
                cluster: defaultCluster,
                username: defaultUser,
              },
            },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a network-asset by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneNetworkAsset({ cluster: defaultCluster, account: '' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})
