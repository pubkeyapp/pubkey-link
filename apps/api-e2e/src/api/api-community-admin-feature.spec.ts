import {
  AdminCreateCommunityInput,
  AdminFindManyCommunityInput,
  AdminUpdateCommunityInput,
  Community,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-community-feature', () => {
  describe('api-community-admin-resolver', () => {
    const communityName = uniqueId('acme-community')
    let communityId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateCommunity({ input: { name: communityName } }, { cookie })
      communityId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a community', async () => {
        const input: AdminCreateCommunityInput = {
          name: uniqueId('community'),
        }

        const res = await sdk.adminCreateCommunity({ input }, { cookie })

        const item: Community = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a community', async () => {
        const createInput: AdminCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.adminCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id
        const input: AdminUpdateCommunityInput = {
          name: uniqueId('community'),
        }

        const res = await sdk.adminUpdateCommunity({ communityId, input }, { cookie })

        const item: Community = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of communities (find all)', async () => {
        const createInput: AdminCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.adminCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const input: AdminFindManyCommunityInput = {}

        const res = await sdk.adminFindManyCommunity({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(communityId)
      })

      it('should find a list of communities (find new one)', async () => {
        const createInput: AdminCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.adminCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const input: AdminFindManyCommunityInput = {
          search: communityId,
        }

        const res = await sdk.adminFindManyCommunity({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(communityId)
      })

      it('should find a community by id', async () => {
        const createInput: AdminCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.adminCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const res = await sdk.adminFindOneCommunity({ communityId }, { cookie })

        expect(res.data.item.id).toBe(communityId)
      })

      it('should delete a community', async () => {
        const createInput: AdminCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.adminCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const res = await sdk.adminDeleteCommunity({ communityId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyCommunity({ input: { search: communityId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a community', async () => {
        expect.assertions(1)
        const input: AdminCreateCommunityInput = {
          name: uniqueId('community'),
        }

        try {
          await sdk.adminCreateCommunity({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a community', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateCommunity({ communityId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of communities (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyCommunity({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a community by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneCommunity({ communityId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a community', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteCommunity({ communityId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
