import {
  UserCreateCommunityMemberInput,
  UserFindManyCommunityMemberInput,
  UserUpdateCommunityMemberInput,
  CommunityMember,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-community-member-feature', () => {
  describe('api-community-member-user-resolver', () => {
    const communityMemberName = uniqueId('acme-community-member')
    let communityMemberId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateCommunityMember({ input: { name: communityMemberName } }, { cookie })
      communityMemberId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a community-member', async () => {
        const input: UserCreateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }

        const res = await sdk.userCreateCommunityMember({ input }, { cookie })

        const item: CommunityMember = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a community-member', async () => {
        const createInput: UserCreateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }
        const createdRes = await sdk.userCreateCommunityMember({ input: createInput }, { cookie })
        const communityMemberId = createdRes.data.created.id
        const input: UserUpdateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }

        const res = await sdk.userUpdateCommunityMember({ communityMemberId, input }, { cookie })

        const item: CommunityMember = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of communityMembers (find all)', async () => {
        const createInput: UserCreateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }
        const createdRes = await sdk.userCreateCommunityMember({ input: createInput }, { cookie })
        const communityMemberId = createdRes.data.created.id

        const input: UserFindManyCommunityMemberInput = {}

        const res = await sdk.userFindManyCommunityMember({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(communityMemberId)
      })

      it('should find a list of communityMembers (find new one)', async () => {
        const createInput: UserCreateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }
        const createdRes = await sdk.userCreateCommunityMember({ input: createInput }, { cookie })
        const communityMemberId = createdRes.data.created.id

        const input: UserFindManyCommunityMemberInput = {
          search: communityMemberId,
        }

        const res = await sdk.userFindManyCommunityMember({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(communityMemberId)
      })

      it('should find a community-member by id', async () => {
        const createInput: UserCreateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }
        const createdRes = await sdk.userCreateCommunityMember({ input: createInput }, { cookie })
        const communityMemberId = createdRes.data.created.id

        const res = await sdk.userFindOneCommunityMember({ communityMemberId }, { cookie })

        expect(res.data.item.id).toBe(communityMemberId)
      })

      it('should delete a community-member', async () => {
        const createInput: UserCreateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }
        const createdRes = await sdk.userCreateCommunityMember({ input: createInput }, { cookie })
        const communityMemberId = createdRes.data.created.id

        const res = await sdk.userDeleteCommunityMember({ communityMemberId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyCommunityMember({ input: { search: communityMemberId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a community-member', async () => {
        expect.assertions(1)
        const input: UserCreateCommunityMemberInput = {
          name: uniqueId('community-member'),
        }

        try {
          await sdk.userCreateCommunityMember({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not update a community-member', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateCommunityMember({ communityMemberId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a list of communityMembers (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyCommunityMember({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a community-member by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneCommunityMember({ communityMemberId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a community-member', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteCommunityMember({ communityMemberId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})
