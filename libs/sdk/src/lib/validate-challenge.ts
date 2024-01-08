import * as bs58 from 'bs58'

export function validateChallenge(input: string): { success: boolean; message?: string } {
  const challenge = input.split('Challenge: ')[1]
  const stripped = challenge.split('.')[0]

  const decoded = Buffer.from(bs58.decode(stripped)).toString('utf-8')
  const expiresAt = new Date(Number(decoded.split('.')[1])).getTime()
  const now = new Date().getTime()

  return { success: expiresAt > now }
}
