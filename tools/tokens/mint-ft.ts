import { getKeypairFromFile } from '@solana-developers/helpers'
import { getMetadataPointerState, getMint, getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { sendAndConfirmTransaction } from '@solana/web3.js'
import { join } from 'path'
import {
  createMintTransaction,
  createNewMintTransaction,
  getConnection,
  getMetadata,
  getMintLamports,
} from './mint-helpers'

const cwd = __dirname

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const endpoint = 'http://localhost:8899'
  const connection = getConnection(endpoint)

  const [feePayer, mintKeypair] = await Promise.all([
    getKeypairFromFile(join(cwd, './keypair/alice-keypair.json')),
    getKeypairFromFile(join(cwd, './keypair/mint-ft.json')),
  ])

  const updateAuthority = feePayer.publicKey
  const mintAuthority = feePayer.publicKey
  const mint = mintKeypair.publicKey
  const decimals = 6

  // Metadata to store in Mint Account
  const metadata: TokenMetadata = getMetadata({ updateAuthority, mint, color: 'orange' })

  // Minimum lamports required for Mint Account
  const { space, lamports } = await getMintLamports({ connection, metadata })

  const transaction = createMintTransaction({
    feePayerPubkey: feePayer.publicKey,
    mint,
    updateAuthority,
    metadata,
    mintAuthority,
    decimals,
    space,
    lamports,
  })

  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [feePayer, mintKeypair], // Signers
  )

  console.log('\nCreate Mint Account:', `https://explorer.solana.com/tx/${transactionSignature}?cluster=custom`)

  // Retrieve mint information
  const mintInfo = await getMint(connection, mint, 'confirmed', TOKEN_2022_PROGRAM_ID)

  // Retrieve and log the metadata pointer state
  const metadataPointer = getMetadataPointerState(mintInfo)
  console.log('\nMetadata Pointer:', JSON.stringify(metadataPointer, null, 2))

  // Retrieve and log the metadata state
  const tokenMetadata = await getTokenMetadata(connection, mint)
  console.log('\nMetadata:', JSON.stringify(tokenMetadata, null, 2))

  // Mint to the Fee Payer
  const mintAmount = 100_000_000
  const mintTx = await createNewMintTransaction({
    connection,
    feePayer,
    mint,
    mintAuthority,
    destination: feePayer.publicKey,
    amount: mintAmount * Math.pow(10, decimals),
  })

  let { lastValidBlockHeight, blockhash } = await connection.getLatestBlockhash('confirmed')
  mintTx.recentBlockhash = blockhash
  mintTx.lastValidBlockHeight = lastValidBlockHeight
  mintTx.feePayer = feePayer.publicKey
  const transactionId = await sendAndConfirmTransaction(connection, mintTx, [feePayer])

  console.log('\nMint Tokens:', `https://explorer.solana.com/tx/${transactionId}?cluster=custom`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
