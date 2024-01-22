import { Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import { IDL as CounterIDL } from '../target/types/counter'
import type { Counter } from '../target/types/counter'

export { Counter, CounterIDL }
export type CounterProgram = Program<Counter>
export const COUNTER_PROGRAM_ID = new PublicKey('5t7i8rFcWxrBhf7PYbxBQudXYQLnJW4zBS4xiknaFuCv')

export function getCounterProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    default:
      return COUNTER_PROGRAM_ID
  }
}
