import { ExtensionType, getExtensionData, getMint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { unpack } from '@solana/spl-token-metadata'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'

async function main() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  const mint = await getMint(
    connection,
    new PublicKey('DEVS9UjXwEFySys4McFCQ3x7xzE1Eft3Aq8RTKsH9J2g'),
    undefined,
    TOKEN_2022_PROGRAM_ID,
  )
  // const tokenMeta = await getTokenMetadata(connection, new PublicKey('DEVS9UjXwEFySys4McFCQ3x7xzE1Eft3Aq8RTKsH9J2g'))

  const data = getExtensionData(ExtensionType.TokenMetadata, mint.tlvData)

  if (data === null) {
    return null
  }

  const tokenMeta = unpack(data)

  if (tokenMeta && tokenMeta.uri) {
    const data = await fetch(tokenMeta.uri).then((res) => res.text())
    console.log(tokenMeta)
    // {
    //   updateAuthority: "BeEMANoRU9SUfEdeN4zx7CC3TdWXjfn37rRTDEr4k4C7",
    //   mint: "DEVS9UjXwEFySys4McFCQ3x7xzE1Eft3Aq8RTKsH9J2g",
    //   name: 'Solfate Devlist Mint List',
    //   symbol: 'Solfate Devlist Mint List',
    //   uri: 'https://gist.githubusercontent.com/beeman/79e21b38f976e81b7c6ad63872be3e9d/raw',
    //   additionalMetadata: []
    // }
    console.log(data)
    // DEvaC9YcvdkioAPtoi6gaitrH6YxZvTg3X3NAR5Dmssk
    // DEVmtLQAsiGe6LyugkiX157YqYPTriiE5KQyTLULWi1P
    // DeVDiJrVyESnVDcLcbnDjNMo6d5ujqqKxEhrL1Tqun8o
    // DeVyPKMU5nCND5QqYRsTeWghgeP2MtQHc7scezoqTAyb
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
