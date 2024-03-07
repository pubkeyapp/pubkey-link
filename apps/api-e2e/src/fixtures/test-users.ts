import { Keypair } from '@solana/web3.js'

import secretAlice from './ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG.json'
import secretBob from './BoBigKFEgt5izFVmpZAqnHDjNXNMYFbYrbiXy4EkfJDE.json'

const keypairAlice = Keypair.fromSecretKey(Uint8Array.from(secretAlice))
const keypairBob = Keypair.fromSecretKey(Uint8Array.from(secretBob))

export interface TestUser {
  username: string
  solana: Keypair
}

export const alice: TestUser = {
  username: 'alice',
  solana: keypairAlice,
}

export const bob: TestUser = {
  username: 'bob',
  solana: keypairBob,
}
