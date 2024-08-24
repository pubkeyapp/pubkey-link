import { randomBytes } from 'node:crypto'

export function getRandomString(bytes: number) {
  return randomBytes(bytes)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
}
