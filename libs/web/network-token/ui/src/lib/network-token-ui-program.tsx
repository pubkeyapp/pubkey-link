import { SystemProgram } from '@solana/web3.js'
import {
  SOLANA_PROGRAM_ID_MPL_CORE,
  SOLANA_PROGRAM_ID_REALMS,
  SOLANA_PROGRAM_ID_TOKEN,
  SOLANA_PROGRAM_ID_TOKEN_2022,
} from '@pubkey-link/sdk'

export function NetworkTokenUiProgram({ program }: { program: string }) {
  return getTokenProgram(program)
}

const map = new Map<string, string>()
  .set(SOLANA_PROGRAM_ID_REALMS, 'Realms')
  .set(SOLANA_PROGRAM_ID_MPL_CORE, 'MPL Core')
  .set(SOLANA_PROGRAM_ID_TOKEN, 'Token')
  .set(SOLANA_PROGRAM_ID_TOKEN_2022, 'Token 2022')
  .set(SystemProgram.programId.toString(), 'System Program')

function getTokenProgram(program: string) {
  return map.get(program) ?? program
}
