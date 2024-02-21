import {
  AdminCreateSnapshotInput,
  AdminFindManySnapshotInput,
  AdminUpdateSnapshotInput,
  Snapshot,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-snapshot-feature', () => {
  describe('api-snapshot-admin-resolver', () => {
    const snapshotName = uniqueId('acme-snapshot')
    let snapshotId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateSnapshot({ input: { name: snapshotName } }, { cookie })
      snapshotId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a snapshot', async () => {
        const input: AdminCreateSnapshotInput = {
          name: uniqueId('snapshot'),
        }

        const res = await sdk.adminCreateSnapshot({ input }, { cookie })

        const item: Snapshot = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a snapshot', async () => {
        const createInput: AdminCreateSnapshotInput = {
          name: uniqueId('snapshot'),
        }
        const createdRes = await sdk.adminCreateSnapshot({ input: createInput }, { cookie })
        const snapshotId = createdRes.data.created.id
        const input: AdminUpdateSnapshotInput = {
          name: uniqueId('snapshot'),
        }

        const res = await sdk.adminUpdateSnapshot({ snapshotId, input }, { cookie })

        const item: Snapshot = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of snapshots (find all)', async () => {
        const createInput: AdminCreateSnapshotInput = {
          name: uniqueId('snapshot'),
        }
        const createdRes = await sdk.adminCreateSnapshot({ input: createInput }, { cookie })
        const snapshotId = createdRes.data.created.id

        const input: AdminFindManySnapshotInput = {}

        const res = await sdk.adminFindManySnapshot({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(snapshotId)
      })

      it('should find a list of snapshots (find new one)', async () => {
        const createInput: AdminCreateSnapshotInput = {
          name: uniqueId('snapshot'),
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
          name: uniqueId('snapshot'),
        }
        const createdRes = await sdk.adminCreateSnapshot({ input: createInput }, { cookie })
        const snapshotId = createdRes.data.created.id

        const res = await sdk.adminFindOneSnapshot({ snapshotId }, { cookie })

        expect(res.data.item.id).toBe(snapshotId)
      })

      it('should delete a snapshot', async () => {
        const createInput: AdminCreateSnapshotInput = {
          name: uniqueId('snapshot'),
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
          name: uniqueId('snapshot'),
        }

        try {
          await sdk.adminCreateSnapshot({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a snapshot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateSnapshot({ snapshotId, input: {} }, { cookie })
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
