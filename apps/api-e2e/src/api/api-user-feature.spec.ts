import { AdminFindManyUserInput, AdminUpdateUserInput, User, UserRole, UserStatus } from '@pubkey-link/sdk'
import { Keypair } from '@solana/web3.js'
import { authenticate, getAliceCookie, getBobCookie, sdk } from '../support'

function avatarUrl(name: string) {
  return `https://source.boringavatars.com/pixel/120/pubkey-link-${name}`
}

describe('api-user-feature', () => {
  describe('api-user-admin-resolver', () => {
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
    })

    describe('authorized', () => {
      it('should update a user', async () => {
        const keypair = Keypair.generate()
        const newUser = await authenticate({ keypair })
        const input: AdminUpdateUserInput = {
          avatarUrl: avatarUrl(newUser.user.id),
          name: 'John Doe',
          status: UserStatus.Active,
        }

        const res = await sdk.adminUpdateUser({ userId: newUser.user.id, input }, { cookie: alice })

        const user: User = res.data.updated
        expect(user.avatarUrl).toBe(input.avatarUrl)
        expect(user.name).toBe(input.name)
        expect(user.role).toBe(UserRole.User)
        expect(user.status).toBe(input.status)
      })

      it('should not update a user with an existing name', async () => {
        const keypair = Keypair.generate()
        const newUser = await authenticate({ keypair })
        expect.assertions(1)

        const input: AdminUpdateUserInput = {
          username: 'alice',
        }
        try {
          await sdk.adminUpdateUser({ userId: newUser.user.id, input }, { cookie: alice })
        } catch (e) {
          expect(e.message).toBe(`User ${input.username} already exists`)
        }
      })

      it('should find a list of users (find all)', async () => {
        const keypair = Keypair.generate()
        const newUser = await authenticate({ keypair })

        const input: AdminFindManyUserInput = { limit: 1000 }

        const res = await sdk.adminFindManyUser({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(4)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(4)
        // First item should be the one we created above
        expect(res.data.paging.data.map((u) => u.id)).toContain(newUser.user.id)
      })

      it('should find a list of users (find new one)', async () => {
        const keypair = Keypair.generate()
        const newUser = await authenticate({ keypair })

        const input: AdminFindManyUserInput = {
          search: newUser.user.id,
        }

        const res = await sdk.adminFindManyUser({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(newUser.user.id)
      })

      it('should find a user by id', async () => {
        const keypair = Keypair.generate()
        const newUser = await authenticate({ keypair })

        const res = await sdk.adminFindOneUser({ userId: newUser.user.id }, { cookie: alice })

        expect(res.data.item.id).toBe(newUser.user.id)
      })

      it('should delete a user', async () => {
        const keypair = Keypair.generate()
        const newUser = await authenticate({ keypair })

        const res = await sdk.adminDeleteUser({ userId: newUser.user.id }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyUser({ input: { search: newUser.user.id } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not update a user', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateUser({ userId: 'alice', input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of users (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyUser({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a user by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneUser({ userId: 'alice' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a user', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteUser({ userId: 'alice' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
