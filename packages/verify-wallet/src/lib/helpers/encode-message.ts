export function encodeMessage(message: string): Uint8Array {
  return new TextEncoder().encode(message)
}
