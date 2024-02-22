import { AdminCreateSnapshotInput, AdminFindManySnapshotInput, Snapshot } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultRoleId = 'one-of-us-pubkey'

describe('api-snapshot-feature', () => {
  describe('api-snapshot-admin-resolver', () => {
    let snapshotId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateSnapshot({ input: { roleId: defaultRoleId } }, { cookie })
      snapshotId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a snapshot', async () => {
        const input: AdminCreateSnapshotInput = {
          roleId: defaultRoleId,
        }

        const res = await sdk.adminCreateSnapshot({ input }, { cookie })

        const item: Snapshot = res.data.created
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should find a list of snapshots (find all)', async () => {
        const input: AdminFindManySnapshotInput = {}

        const res = await sdk.adminFindManySnapshot({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
      })

      it('should find a list of snapshots (find new one)', async () => {
        const createInput: AdminCreateSnapshotInput = {
          roleId: defaultRoleId,
        }
        const createdRes = await sdk.adminCreateSnapshot({ input: createInput }, { cookie })
        const snapshotId = createdRes.data.created.id

        const input: AdminFindManySnapshotInput = {
          search: snapshotId,
        }

        const res = await sdk.adminFindManySnapshot({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(snapshotId)
      })

      it('should find a snapshot by id', async () => {
        const createInput: AdminCreateSnapshotInput = {
          roleId: defaultRoleId,
        }
        const createdRes = await sdk.adminCreateSnapshot({ input: createInput }, { cookie })
        const snapshotId = createdRes.data.created.id

        const res = await sdk.adminFindOneSnapshot({ snapshotId }, { cookie })

        expect(res.data.item.id).toBe(snapshotId)
      })

      it('should delete a snapshot', async () => {
        const createInput: AdminCreateSnapshotInput = {
          roleId: defaultRoleId,
        }
        const createdRes = await sdk.adminCreateSnapshot({ input: createInput }, { cookie })
        const snapshotId = createdRes.data.created.id

        const res = await sdk.adminDeleteSnapshot({ snapshotId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManySnapshot({ input: { search: snapshotId } }, { cookie })
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
        const input: AdminCreateSnapshotInput = {
          roleId: defaultRoleId,
        }

        try {
          await sdk.adminCreateSnapshot({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of snapshots (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManySnapshot({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a snapshot by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneSnapshot({ snapshotId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a snapshot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteSnapshot({ snapshotId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
