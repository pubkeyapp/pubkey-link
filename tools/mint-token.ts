import { getKeypairFromFile } from '@solana-developers/helpers'
import { ExtensionType, getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { Connection, PublicKey } from '@solana/web3.js'
import { TokenMint } from './token-mint'

// First param is the link to the keypair file
const keypairFile = process.argv[2]
// Second param is the link to the metadata uri
const metadataUri = process.argv[3]
// Optional third param is the word 'close'
const close = process.argv[4] === 'close'

// Make sure both params are provided
if (!keypairFile || !metadataUri) {
  console.error('Please provide keypair file and metadata uri')
  process.exit(1)
}

// Metadata uri must be a valid url
if (!metadataUri.startsWith('https://')) {
  console.error('Metadata uri must be a valid url')
  process.exit(1)
}

function getExplorerUrl(path: string) {
  return `https://solana.fm/${path.startsWith('/') ? path.slice(1) : path}?cluster=devnet-solana`
}

async function main() {
  const connection = new Connection(
    'https://devnet.helius-rpc.com/?api-key=987d5482-d413-4748-9d23-fdfdebaa7e19',
    'confirmed',
  )
  const feePayer = await getKeypairFromFile()
  if (!feePayer) {
    console.error('Invalid keypair file')
    process.exit(1)
  }
  console.log(`Using keypair ${feePayer.publicKey.toBase58()} to pay fees`)
  const mint = await getKeypairFromFile(keypairFile)
  if (!mint) {
    console.error('Invalid keypair file')
    process.exit(1)
  }
  const mintListUrl = metadataUri
  console.log(`Using keypair ${mint.publicKey.toBase58()} to mint token with metadata uri ${metadataUri}`)

  const metadata: TokenMetadata = {
    name: 'Solfate Devlist Mint List',
    symbol: 'Solfate Devlist Mint List',
    mint: mint.publicKey,
    updateAuthority: feePayer.publicKey,
    uri: metadataUri, // This could be a normal metadata uri with collection image, etc
    additionalMetadata: [
      ['mint-list', mintListUrl], // This indicates there is a mint list
    ],
  }

  const tokenMint = new TokenMint({
    connection,
    decimals: 0,
    extensionTypes: [ExtensionType.MintCloseAuthority, ExtensionType.MetadataPointer],
    mint: mint,
    programId: TOKEN_2022_PROGRAM_ID,
    feePayer,
    metadata,
  })

  const info = await tokenMint.getMint()
  if (info) {
    if (close) {
      console.log('CLOSE')
      // const signature = await tokenMint.closeMint()
      // console.log(`Mint close transaction confirmed: ${getExplorerUrl(`tx/${signature}`)}`)
      process.exit(0)
    }

    console.error(`Mint exists! ${getExplorerUrl(`account/${tokenMint.mintPublicKey}`)}`)

    const tokenMeta = await getTokenMetadata(connection, new PublicKey('DEVS9UjXwEFySys4McFCQ3x7xzE1Eft3Aq8RTKsH9J2g'))

    if (tokenMeta && tokenMeta.uri) {
      const data = await fetch(tokenMeta.uri).then((res) => res.text())
      console.log('List', data)
    }

    process.exit(1)
  }

  console.log(tokenMint)
  const signature = await tokenMint.createMint()
  console.log(`Mint transaction confirmed: ${getExplorerUrl(`tx/${signature}`)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
