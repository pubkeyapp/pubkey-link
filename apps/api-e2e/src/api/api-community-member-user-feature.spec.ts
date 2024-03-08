import {
  CommunityMember,
  CommunityRole,
  UserFindManyCommunityMemberInput,
  UserUpdateCommunityMemberInput,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCommunityId = 'pubkey'
xdescribe('api-community-member-feature', () => {
  describe('api-community-member-user-resolver', () => {
    let communityMemberId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
    })

    describe('authorized', () => {
      it('should update a community-member', async () => {
        const input: UserUpdateCommunityMemberInput = {
          role: CommunityRole.Admin,
        }

        const res = await sdk.userUpdateCommunityMember({ communityMemberId, input }, { cookie: alice })

        const item: CommunityMember = res.data.updated
        expect(item.role).toBe(input.role)
      })

      it('should find a list of communityMembers (find all)', async () => {
        const input: UserFindManyCommunityMemberInput = {
          communityId: defaultCommunityId,
        }

        const res = await sdk.userFindManyCommunityMember({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(communityMemberId)
      })

      it('should find a list of communityMembers (find new one)', async () => {
        const input: UserFindManyCommunityMemberInput = {
          communityId: defaultCommunityId,
          search: communityMemberId,
        }

        const res = await sdk.userFindManyCommunityMember({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(communityMemberId)
      })

      it('should find a community-member by id', async () => {
        const res = await sdk.userFindOneCommunityMember({ communityMemberId }, { cookie: alice })

        expect(res.data.item.id).toBe(communityMemberId)
      })

      it('should delete a community-member', async () => {
        const res = await sdk.userDeleteCommunityMember({ communityMemberId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyCommunityMember(
          {
            input: {
              communityId: defaultCommunityId,
              search: communityMemberId,
            },
          },
          { cookie: alice },
        )
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not update a community-member', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateCommunityMember(
            {
              communityMemberId,
              input: {
                role: CommunityRole.Admin,
              },
            },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a list of communityMembers (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyCommunityMember(
            {
              input: {
                communityId: defaultCommunityId,
              },
            },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a community-member by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneCommunityMember({ communityMemberId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a community-member', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteCommunityMember({ communityMemberId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})
