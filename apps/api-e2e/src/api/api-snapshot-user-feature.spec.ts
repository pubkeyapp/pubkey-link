import { Snapshot, UserCreateSnapshotInput, UserFindManySnapshotInput } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCommunityId = 'pubkey'
const defaultRoleId = 'one-of-us-pubkey'
describe('api-snapshot-feature', () => {
  describe('api-snapshot-user-resolver', () => {
    let snapshotId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      const created = await sdk.userCreateSnapshot({ input: { roleId: defaultRoleId } }, { cookie: alice })
      snapshotId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        alice = await getAliceCookie()
      })

      it('should create a snapshot', async () => {
        const input: UserCreateSnapshotInput = {
          roleId: defaultRoleId,
        }

        const res = await sdk.userCreateSnapshot({ input }, { cookie: alice })

        const item: Snapshot = res.data.created

        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should find a list of snapshots (find all)', async () => {
        const input: UserFindManySnapshotInput = {
          communityId: defaultCommunityId,
        }

        const res = await sdk.userFindManySnapshot({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
      })

      it('should find a list of snapshots (find new one)', async () => {
        const createInput: UserCreateSnapshotInput = {
          roleId: defaultRoleId,
        }
        const createdRes = await sdk.userCreateSnapshot({ input: createInput }, { cookie: alice })
        const snapshotId = createdRes.data.created.id

        const input: UserFindManySnapshotInput = { communityId: defaultCommunityId, search: snapshotId }

        const res = await sdk.userFindManySnapshot({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(snapshotId)
      })

      it('should find a snapshot by id', async () => {
        const createInput: UserCreateSnapshotInput = {
          roleId: defaultRoleId,
        }
        const createdRes = await sdk.userCreateSnapshot({ input: createInput }, { cookie: alice })
        const snapshotId = createdRes.data.created.id

        const res = await sdk.userFindOneSnapshot({ snapshotId }, { cookie: alice })

        expect(res.data.item.id).toBe(snapshotId)
      })

      it('should delete a snapshot', async () => {
        const createInput: UserCreateSnapshotInput = {
          roleId: defaultRoleId,
        }
        const createdRes = await sdk.userCreateSnapshot({ input: createInput }, { cookie: alice })
        const snapshotId = createdRes.data.created.id

        const res = await sdk.userDeleteSnapshot({ snapshotId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManySnapshot(
          {
            input: {
              communityId: defaultCommunityId,
              search: snapshotId,
            },
          },
          { cookie: alice },
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

      it('should not create a snapshot', async () => {
        expect.assertions(1)
        const input: UserCreateSnapshotInput = {
          roleId: defaultRoleId,
        }

        try {
          await sdk.userCreateSnapshot({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })

      it('should not find a list of snapshots (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManySnapshot({ input: { communityId: defaultCommunityId } }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })

      it('should not find a snapshot by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneSnapshot({ snapshotId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })

      it('should not delete a snapshot', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteSnapshot({ snapshotId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })
    })
  })
})
