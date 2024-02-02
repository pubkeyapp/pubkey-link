import {
  Account,
  closeAccount,
  createAccount,
  createInitializeInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintCloseAuthorityInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMint,
  getMintLen,
  getOrCreateAssociatedTokenAccount,
  LENGTH_SIZE,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
  withdrawWithheldTokensFromAccounts,
} from '@solana/spl-token'
import { pack, TokenMetadata } from '@solana/spl-token-metadata'
import {
  Commitment,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'

export interface TokenMintConfig {
  connection: Connection
  decimals: number
  feePayer: Keypair
  mint: Keypair
  programId?: PublicKey
  extensionTypes: ExtensionType[]
  metadata: TokenMetadata
}

export class TokenMint {
  // Commitment for transactions
  private readonly commitment: Commitment = 'confirmed'
  // Solana Connection
  private readonly connection: Connection
  // Decimals for Mint Account
  readonly decimals: number
  // Extension Types for Mint Account
  private readonly extensionTypes: ExtensionType[]
  // Fee Payer Keypair, gets Mint Authority, and gets withdraw authority
  readonly feePayer: Keypair
  // Public Key of the Fee Payer
  readonly feePayerPublicKey: PublicKey
  // Freeze Authority, it's used to freeze accounts
  private readonly freezeAuthority: PublicKey | null
  // Token Metadata
  private readonly metadata: TokenMetadata
  // Size of the metadata
  private readonly metadataLen: number
  // Mint Keypair, it's used to sign the mint account creation transaction
  private readonly mint: Keypair
  // Length of the Mint Account based on the extension types
  private readonly mintLen: number
  // Mint Public Key
  readonly mintPublicKey: PublicKey
  // Token Program ID (Token/Token2022)
  readonly programId: PublicKey

  constructor(config: TokenMintConfig) {
    this.connection = config.connection
    this.decimals = config.decimals
    this.extensionTypes = config.extensionTypes
    this.feePayer = config.feePayer
    this.feePayerPublicKey = this.feePayer.publicKey
    this.freezeAuthority = this.feePayerPublicKey
    this.metadata = config.metadata
    this.metadataLen = pack(this.metadata).length
    this.mint = config.mint
    this.mintLen = getMintLen(this.extensionTypes)
    this.mintPublicKey = this.mint.publicKey
    this.programId = config.programId ?? TOKEN_2022_PROGRAM_ID
    console.log({
      decimals: this.decimals,
      mintPublicKey: this.mintPublicKey.toBase58(),
      feePayerPublicKey: this.feePayerPublicKey.toBase58(),
    })
  }

  async createMint(): Promise<string> {
    return this.createMintTransaction().then((transaction) =>
      sendAndConfirmTransaction(
        this.connection,
        transaction,
        [this.feePayer, this.mint], // Signers
      ),
    )
  }

  private async createMintTransaction() {
    return new Transaction().add(
      await this.createAccount(),
      this.createInitializeMintCloseAuthorityInstruction(),
      this.createInitializeMetadataPointerInstruction(),
      this.createInitializeMintInstruction(),
      this.createInitializeMetadataInstruction(),
    )
  }

  getExtensions(): string[] {
    return this.extensionTypes.map((type) => ExtensionType[type])
  }

  async withdrawFees({ sources }: { sources: PublicKey[] }): Promise<string> {
    const feePayerTokenAccount = await this.getOrCreateTokenAccount({ accountOwner: this.feePayerPublicKey })
    return withdrawWithheldTokensFromAccounts(
      this.connection,
      this.feePayer, // Transaction fee payer
      this.mintPublicKey, // Mint Account address
      feePayerTokenAccount.address, // Destination account for fee withdrawal
      this.feePayerPublicKey, // Authority for fee withdrawal
      [], // Additional signers
      sources, // Token Accounts to withdrawal from
      { commitment: this.commitment }, // Confirmation options
      this.programId, // Token Extension Program ID
    )
  }

  async createAndMintToAccount({
    amountToMint,
    accountOwner,
  }: {
    amountToMint: number
    accountOwner: PublicKey
  }): Promise<string> {
    return (
      // Create Token Account for Playground wallet
      this.createTokenAccount({ accountOwner })
        // With the token account of the owner, mint tokens to it
        .then((destination) => this.mintToAccount({ amountToMint, destination }))
    )
  }

  async closeMint(): Promise<string> {
    return await closeAccount(
      this.connection,
      this.feePayer, // Transaction fee payer
      this.mintPublicKey, // Mint Account address
      this.feePayerPublicKey, // Account to receive lamports from closed account
      this.feePayer, // Close Authority for Mint Account
      undefined, // Additional signers
      undefined, // Confirmation options
      this.programId, // Token Extension Program ID
    )
  }

  cacheKey(method: string): string[] {
    return [this.connection.rpcEndpoint.toString(), this.mintPublicKey.toBase58(), method]
  }

  async getMint() {
    return getMint(this.connection, this.mintPublicKey, this.commitment, this.programId)
  }

  private getLamportsForMint() {
    // Size of MetadataExtension 2 bytes for type, 2 bytes for length
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE

    return this.connection.getMinimumBalanceForRentExemption(this.mintLen + this.metadataLen + metadataExtension)
  }

  // Instruction to invoke System Program to create new account
  private async createAccount(): Promise<TransactionInstruction> {
    const lamports = await this.getLamportsForMint()
    return SystemProgram.createAccount({
      fromPubkey: this.feePayerPublicKey,
      newAccountPubkey: this.mintPublicKey,
      lamports,
      space: this.mintLen,
      programId: this.programId,
    })
  }

  // Create Token Account for accountOwner
  private async createTokenAccount({ accountOwner }: { accountOwner: PublicKey }): Promise<PublicKey> {
    return createAccount(
      this.connection,
      this.feePayer, // Payer to create Token Account
      this.mintPublicKey, // Mint Account address
      accountOwner, // Token Account owner
      undefined, // Optional keypair, default to Associated Token Account
      undefined, // Confirmation options
      this.programId, // Token Extension Program ID
    )
  }

  // Get or Create Token Account for accountOwner
  private async getOrCreateTokenAccount({ accountOwner }: { accountOwner: PublicKey }): Promise<Account> {
    return getOrCreateAssociatedTokenAccount(
      this.connection,
      this.feePayer, // Payer to create Token Account
      this.mintPublicKey, // Mint Account address
      accountOwner, // Token Account owner
      undefined, // Optional keypair, default to Associated Token Account
      this.commitment, // Confirmation options
      undefined, // Token Extension Program ID
      this.programId, // Token Extension Program ID
    )
  }

  // Mint tokens to the destination Token Account
  private async mintToAccount({
    amountToMint,
    destination,
  }: {
    amountToMint: number
    destination: PublicKey
  }): Promise<string> {
    return mintTo(
      this.connection,
      this.feePayer, // Transaction fee payer
      this.mintPublicKey, // Mint Account address
      destination, // Mint to
      this.feePayerPublicKey, // Mint Authority address
      amountToMint * 10 ** this.decimals, // Amount to mint
      undefined, // Additional signers
      undefined, // Confirmation options
      this.programId, // Token Extension Program ID
    )
  }

  // Instruction to initialize Metadata Pointer Extension
  private createInitializeMetadataPointerInstruction(): TransactionInstruction {
    return createInitializeMetadataPointerInstruction(
      this.mintPublicKey, // Mint Account Address
      this.feePayerPublicKey, // Authority that can set the metadata address
      this.mintPublicKey, // Account address that holds the metadata
      this.programId, // Token Extension Program ID
    )
  }

  // Instruction to initialize Metadata Pointer Extension
  private createInitializeMetadataInstruction(): TransactionInstruction {
    return createInitializeInstruction({
      programId: this.programId, // Token Extension Program ID
      metadata: this.mintPublicKey, // Account address that holds the metadata
      updateAuthority: this.feePayerPublicKey, // Authority that can update the metadata
      mint: this.mintPublicKey, // Mint Account Address
      mintAuthority: this.feePayerPublicKey, // Designated Mint Authority
      name: this.metadata.name, // Name of the token
      symbol: this.metadata.symbol, // Symbol of the token
      uri: this.metadata.uri, // URI of the token
    })
  }

  // Instruction to initialize Mint Account data
  private createInitializeMintInstruction(): TransactionInstruction {
    return createInitializeMintInstruction(
      this.mintPublicKey, // Mint Account Address
      this.decimals, // Decimals of Mint
      this.feePayerPublicKey, // Designated Mint Authority
      this.freezeAuthority, // Optional Freeze Authority
      this.programId, // Token Extension Program ID
    )
  }

  // Instruction to initialize Mint Close Authority Extension
  private createInitializeMintCloseAuthorityInstruction(): TransactionInstruction {
    return createInitializeMintCloseAuthorityInstruction(
      this.mintPublicKey, // Mint Account address
      this.feePayerPublicKey, // Designated Close Authority
      this.programId, // Token Extension Program ID
    )
  }
}
