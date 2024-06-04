import { getKeypairFromFile } from '@solana-developers/helpers'
import { join } from 'node:path'

// tstw4Ke6pFZHgcSk8YfXvnuPkx5wxKukuk9xQbatYnC
export const testKeypair = getKeypairFromFile(join(__dirname, 'test-keypair.json'))
