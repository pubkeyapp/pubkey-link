import { RegisterInput, UserRole, UserStatus } from '@pubkey-link/sdk'
import { sdk, uniqueId } from '../support'

describe('api-auth-feature', () => {
  describe('api-auth-resolver', () => {
    describe('authorized', () => {
      it('should log in as alice', async () => {
        const res = await sdk.login({
          input: { username: 'alice', password: 'password' },
        })

        expect(res.data.login.id).toBe('alice')
        expect(res.data.login.username).toBe('alice')
        expect(res.data.login.role).toBe(UserRole.Admin)
        expect(res.data.login.status).toBe(UserStatus.Active)
        expect((res.data.login as { password?: string }).password).toBeUndefined()

        const meRes = await sdk.me(
          {},
          {
            cookie: res.headers.get('set-cookie'),
          },
        )
        expect(meRes.data.me.id).toBe('alice')
        expect(meRes.data.me.username).toBe('alice')
        expect((meRes.data.me as { password?: string }).password).toBeUndefined()
      })

      it('should log in as bob', async () => {
        const res = await sdk.login({
          input: { username: 'bob', password: 'password' },
        })

        expect(res.data.login.id).toBe('bob')
        expect(res.data.login.username).toBe('bob')
        expect(res.data.login.role).toBe(UserRole.User)
        expect(res.data.login.status).toBe(UserStatus.Active)
        expect((res.data.login as { password?: string }).password).toBeUndefined()

        const meRes = await sdk.me(
          {},
          {
            cookie: res.headers.get('set-cookie'),
          },
        )
        expect(meRes.data.me.id).toBe('bob')
        expect(meRes.data.me.username).toBe('bob')
        expect((meRes.data.me as { password?: string }).password).toBeUndefined()
      })

      it('should register a new user and log in', async () => {
        const input: RegisterInput = { username: uniqueId('user'), password: 'password' }
        const res = await sdk.register({ input })

        expect(res.data.register.id).toBeDefined()
        expect(res.data.register.username).toBe(input.username)
        expect(res.data.register.role).toBe(UserRole.User)
        expect(res.data.register.status).toBe(UserStatus.Created)
        expect((res.data.register as { password?: string }).password).toBeUndefined()

        const meRes = await sdk.me(undefined, { cookie: res.headers.get('set-cookie') })
        expect(meRes.data.me.username).toBe(input.username)
        expect(meRes.data.me.status).toBe(UserStatus.Created)
        expect((meRes.data.me as { password?: string }).password).toBeUndefined()
      })
    })

    describe('unauthorized', () => {
      it('should not log in with a short password', async () => {
        expect.assertions(1)
        try {
          await sdk.login({ input: { username: 'alice', password: 'short' } })
        } catch (e) {
          expect(e.message).toContain('Password is too short.')
        }
      })

      it('should not log in with a wrong password', async () => {
        expect.assertions(1)
        try {
          await sdk.login({ input: { username: 'alice', password: 'wrong password' } })
        } catch (e) {
          expect(e.message).toContain('Password is incorrect.')
        }
      })

      it('should not log in with user with empty password', async () => {
        expect.assertions(1)
        try {
          await sdk.login({ input: { username: 'charlie', password: 'does-not-have-a-password' } })
        } catch (e) {
          expect(e.message).toContain('Password login not allowed.')
        }
      })

      it('should not log in with a non-existing user', async () => {
        expect.assertions(1)
        try {
          await sdk.login({ input: { username: uniqueId('user'), password: 'wrong password' } })
        } catch (e) {
          expect(e.message).toContain('User not found.')
        }
      })

      it('should not log in with an inactive user', async () => {
        expect.assertions(1)
        try {
          await sdk.login({ input: { username: 'dave', password: 'password' } })
        } catch (e) {
          expect(e.message).toContain('User is inactive.')
        }
      })
    })
  })
})
