import { hashPassword, validatePassword } from './hash-validate-password'

describe('hash-validate-password', () => {
  describe('password hashing ', () => {
    it('should return hash the password', () => {
      expect(hashPassword('password')).toEqual(expect.any(String))
    })

    it('should validate the password', () => {
      const hashedPassword = hashPassword('password')
      expect(validatePassword('password', hashedPassword)).toBe(true)
    })
  })
})
