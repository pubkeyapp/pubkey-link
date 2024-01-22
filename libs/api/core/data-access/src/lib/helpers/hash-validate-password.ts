import { compareSync, hashSync } from 'bcrypt'

export function hashPassword(password: string): string {
  return hashSync(password, 10)
}

export function validatePassword(password: string, hashedPassword: string): boolean {
  return compareSync(password, hashedPassword)
}
