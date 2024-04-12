import { SystemProgram } from '@solana/web3.js'

export function NetworkTokenUiProgram({ program }: { program: string }) {
  return getTokenProgram(program)
}

const map = new Map<string, string>()
  .set('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', 'Token')
  .set('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb', 'Token 2022')
  .set(SystemProgram.programId.toString(), 'System Program')

function getTokenProgram(program: string) {
  return map.get(program) ?? program
}
