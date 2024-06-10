import { decode, encode } from 'bs58'

export function bs58Encode(data: Uint8Array) {
  return encode(data)
}

export function bs58Decode(data: string) {
  return decode(data)
}
