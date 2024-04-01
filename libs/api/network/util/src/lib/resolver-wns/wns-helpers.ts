import { Idl, Program, Provider } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

import { IDL as WenNewStandardIdl, WenNewStandard } from './programs/types/wen_new_standard'
import { WNS_PROGRAM_ID } from './wns-constants'

export type WnsProgram = Program<WenNewStandard>

export function getMetadataProgram(provider: Provider, programId: PublicKey = WNS_PROGRAM_ID) {
  return new Program(WenNewStandardIdl as Idl, programId, provider) as unknown as WnsProgram
}
