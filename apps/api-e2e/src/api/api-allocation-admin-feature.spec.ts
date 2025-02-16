import {
  AdminCreateAllocationInput,
  AdminFindManyAllocationInput,
  AdminUpdateAllocationInput,
  Allocation,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-allocation-feature', () => {
  describe('api-allocation-admin-resolver', () => {
    const allocationName = uniqueId('acme-allocation')
    let allocationId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateAllocation({ input: { name: allocationName } }, { cookie })
      allocationId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a allocation', async () => {
        const input: AdminCreateAllocationInput = {
          name: uniqueId('allocation'),
        }

        const res = await sdk.adminCreateAllocation({ input }, { cookie })

        const item: Allocation = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a allocation', async () => {
        const createInput: AdminCreateAllocationInput = {
          name: uniqueId('allocation'),
        }
        const createdRes = await sdk.adminCreateAllocation({ input: createInput }, { cookie })
        const allocationId = createdRes.data.created.id
        const input: AdminUpdateAllocationInput = {
          name: uniqueId('allocation'),
        }

        const res = await sdk.adminUpdateAllocation({ allocationId, input }, { cookie })

        const item: Allocation = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of allocations (find all)', async () => {
        const createInput: AdminCreateAllocationInput = {
          name: uniqueId('allocation'),
        }
        const createdRes = await sdk.adminCreateAllocation({ input: createInput }, { cookie })
        const allocationId = createdRes.data.created.id

        const input: AdminFindManyAllocationInput = {}

        const res = await sdk.adminFindManyAllocation({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(allocationId)
      })

      it('should find a list of allocations (find new one)', async () => {
        const createInput: AdminCreateAllocationInput = {
          name: uniqueId('allocation'),
        }
        const createdRes = await sdk.adminCreateAllocation({ input: createInput }, { cookie })
        const allocationId = createdRes.data.created.id

        const input: AdminFindManyAllocationInput = {
          search: allocationId,
        }

        const res = await sdk.adminFindManyAllocation({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(allocationId)
      })

      it('should find a allocation by id', async () => {
        const createInput: AdminCreateAllocationInput = {
          name: uniqueId('allocation'),
        }
        const createdRes = await sdk.adminCreateAllocation({ input: createInput }, { cookie })
        const allocationId = createdRes.data.created.id

        const res = await sdk.adminFindOneAllocation({ allocationId }, { cookie })

        expect(res.data.item.id).toBe(allocationId)
      })

      it('should delete a allocation', async () => {
        const createInput: AdminCreateAllocationInput = {
          name: uniqueId('allocation'),
        }
        const createdRes = await sdk.adminCreateAllocation({ input: createInput }, { cookie })
        const allocationId = createdRes.data.created.id

        const res = await sdk.adminDeleteAllocation({ allocationId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyAllocation({ input: { search: allocationId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a allocation', async () => {
        expect.assertions(1)
        const input: AdminCreateAllocationInput = {
          name: uniqueId('allocation'),
        }

        try {
          await sdk.adminCreateAllocation({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a allocation', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateAllocation({ allocationId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of allocations (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyAllocation({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a allocation by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneAllocation({ allocationId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a allocation', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteAllocation({ allocationId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
