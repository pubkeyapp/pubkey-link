import {
  createInitializeInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  createUpdateFieldInstruction,
  ExtensionType,
  getMintLen,
  getOrCreateAssociatedTokenAccount,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from '@solana/spl-token'
import { pack, TokenMetadata } from '@solana/spl-token-metadata'
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

export function getConnection(endpoint: string) {
  return new Connection(endpoint, 'confirmed')
}

export function getMetadata({
  updateAuthority,
  mint,
  color,
}: {
  updateAuthority: PublicKey
  mint: PublicKey
  color: 'orange' | 'pink' | 'yellow'
}): TokenMetadata {
  return {
    updateAuthority,
    mint,
    name: `PubKey Token (${color})`,
    symbol: color.toUpperCase(),
    uri: `https://raw.githubusercontent.com/pubkeyapp/pubkey-brand/main/logo-dev/icon-${color}.png`,
    additionalMetadata: [
      ['description', 'PubKey Token'],
      ['color', color],
    ],
  }
}

export async function getMintLamports({ connection, metadata }: { connection: Connection; metadata: TokenMetadata }) {
  // Size of MetadataExtension 2 bytes for type, 2 bytes for length
  const metadataExtension = TYPE_SIZE + LENGTH_SIZE

  // Size of metadata
  const metadataLen = pack(metadata).length

  // Size of Mint Account with extension
  const space = getMintLen([ExtensionType.MetadataPointer])

  // Minimum lamports required for Mint Account
  const lamports = await connection.getMinimumBalanceForRentExemption(space + metadataExtension + metadataLen)

  return { space, lamports }
}

export function createMintTransaction({
  feePayerPubkey,
  mint,
  updateAuthority,
  metadata,
  mintAuthority,
  decimals,
  space,
  lamports,
}: {
  feePayerPubkey: PublicKey
  mint: PublicKey
  updateAuthority: PublicKey
  metadata: TokenMetadata
  mintAuthority: PublicKey
  decimals: number
  space: number
  lamports: number
}) {
  const programId = TOKEN_2022_PROGRAM_ID

  // Instruction to invoke System Program to create new account
  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: feePayerPubkey,
    newAccountPubkey: mint,
    space,
    lamports,
    programId,
  })

  // Instruction to initialize the MetadataPointer Extension
  const initializeMetadataPointerInstruction = createInitializeMetadataPointerInstruction(
    mint,
    updateAuthority,
    mint,
    programId,
  )

  // Instruction to initialize Mint Account data
  const initializeMintInstruction = createInitializeMintInstruction(mint, decimals, mintAuthority, null, programId)

  // Instruction to initialize Metadata Account data
  const initializeMetadataInstruction = createInitializeInstruction({
    programId,
    metadata: mint,
    updateAuthority,
    mint,
    mintAuthority,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
  })

  const updateFieldInstructions = metadata.additionalMetadata.map(([field, value]) => {
    return createUpdateFieldInstruction({
      programId,
      metadata: mint,
      updateAuthority,
      field,
      value,
    })
  })

  return new Transaction().add(
    createAccountInstruction,
    initializeMetadataPointerInstruction,
    initializeMintInstruction,
    initializeMetadataInstruction,
    ...updateFieldInstructions,
  )
}

export async function createNewMintTransaction({
  connection,
  feePayer,
  amount,
  mint,
  destination,
  mintAuthority,
}: {
  connection: Connection
  feePayer: Keypair
  mint: PublicKey
  destination: PublicKey
  mintAuthority: PublicKey
  amount: number
}) {
  const tokenATA = await getOrCreateAssociatedTokenAccount(
    connection,
    feePayer,
    mint,
    destination,
    undefined,
    'confirmed',
    undefined,
    TOKEN_2022_PROGRAM_ID,
  )

  return new Transaction().add(
    createMintToInstruction(mint, tokenATA.address, mintAuthority, amount, undefined, TOKEN_2022_PROGRAM_ID),
  )
}
