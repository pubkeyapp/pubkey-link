import { Keypair } from '@solana/web3.js'

const aliceSecret = require('../fixtures/ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG.json')
const bobSecret = require('../fixtures/BoBigKFEgt5izFVmpZAqnHDjNXNMYFbYrbiXy4EkfJDE.json')

const aliceKp = Keypair.fromSecretKey(Uint8Array.from(aliceSecret))
const bobKp = Keypair.fromSecretKey(Uint8Array.from(bobSecret))

export interface TestUser {
  username: string
  password: string
  solana: Keypair
}

export const alice: TestUser = {
  username: 'alice',
  password: 'password',
  solana: aliceKp,
}

export const bob: TestUser = {
  username: 'bob',
  password: 'password',
  solana: bobKp,
}
