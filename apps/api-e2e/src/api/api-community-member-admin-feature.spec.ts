import {
  AdminFindManyCommunityMemberInput,
  AdminUpdateCommunityMemberInput,
  CommunityMember,
  CommunityRole,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCommunityId = 'pubkey'
xdescribe('api-community-member-feature', () => {
  describe('api-community-member-admin-resolver', () => {
    let communityMemberId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
    })

    describe('authorized', () => {
      beforeAll(async () => {
        alice = await getAliceCookie()

        communityMemberId = await sdk
          .adminFindManyCommunityMember({ input: { communityId: defaultCommunityId } }, { cookie: alice })
          .then((res) => res.data.paging.data[0].id)
      })

      it('should update a community-member', async () => {
        const input: AdminUpdateCommunityMemberInput = {
          role: CommunityRole.Admin,
        }

        const res = await sdk.adminUpdateCommunityMember({ communityMemberId, input }, { cookie: alice })
        communityMemberId = res.data.updated.id

        const item: CommunityMember = res.data.updated
        expect(item.id).toBe(communityMemberId)
      })

      it('should find a list of communityMembers (find all)', async () => {
        const input: AdminFindManyCommunityMemberInput = {
          communityId: defaultCommunityId,
        }

        const res = await sdk.adminFindManyCommunityMember({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(communityMemberId)
      })

      it('should find a list of communityMembers (find new one)', async () => {
        const input: AdminFindManyCommunityMemberInput = {
          communityId: defaultCommunityId,
          search: communityMemberId,
        }

        const res = await sdk.adminFindManyCommunityMember({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(communityMemberId)
      })

      it('should find a community-member by id', async () => {
        const res = await sdk.adminFindOneCommunityMember({ communityMemberId }, { cookie: alice })

        expect(res.data.item.id).toBe(communityMemberId)
      })

      it('should delete a community-member', async () => {
        const res = await sdk.adminDeleteCommunityMember({ communityMemberId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyCommunityMember(
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
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not update a community-member', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateCommunityMember(
            { communityMemberId, input: { role: CommunityRole.Admin } },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of communityMembers (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyCommunityMember(
            {
              input: {
                communityId: defaultCommunityId,
              },
            },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a community-member by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneCommunityMember({ communityMemberId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a community-member', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteCommunityMember({ communityMemberId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
