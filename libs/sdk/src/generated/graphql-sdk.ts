// @ts-nocheck
import { z } from 'zod'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type AdminCreateBotInput = {
  clientId: Scalars['String']['input']
  clientSecret: Scalars['String']['input']
  communityId: Scalars['String']['input']
  token: Scalars['String']['input']
}

export type AdminCreateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  cluster: NetworkCluster
  description?: InputMaybe<Scalars['String']['input']>
  discordUrl?: InputMaybe<Scalars['String']['input']>
  githubUrl?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  telegramUrl?: InputMaybe<Scalars['String']['input']>
  twitterUrl?: InputMaybe<Scalars['String']['input']>
  websiteUrl?: InputMaybe<Scalars['String']['input']>
}

export type AdminCreateCommunityMemberInput = {
  communityId: Scalars['String']['input']
  role: CommunityRole
  userId: Scalars['String']['input']
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type AdminCreateNetworkInput = {
  cluster: NetworkCluster
  endpoint: Scalars['String']['input']
  name: Scalars['String']['input']
  type: NetworkType
}

export type AdminCreateNetworkTokenInput = {
  account: Scalars['String']['input']
  cluster: NetworkCluster
}

export type AdminCreateRuleInput = {
  communityId: Scalars['String']['input']
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type AdminCreateUserInput = {
  password?: InputMaybe<Scalars['String']['input']>
  username: Scalars['String']['input']
}

export type AdminFindManyBotInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyCommunityMemberInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<CommunityRole>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyLogInput = {
  botId?: InputMaybe<Scalars['String']['input']>
  communityId: Scalars['String']['input']
  identityProvider?: InputMaybe<IdentityProvider>
  identityProviderId?: InputMaybe<Scalars['String']['input']>
  level?: InputMaybe<LogLevel>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  relatedId?: InputMaybe<Scalars['String']['input']>
  relatedType?: InputMaybe<LogRelatedType>
  ruleId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyNetworkInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyNetworkTokenInput = {
  cluster: NetworkCluster
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyRuleInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatus>
}

export type AdminUpdateBotInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  clientId?: InputMaybe<Scalars['String']['input']>
  clientSecret?: InputMaybe<Scalars['String']['input']>
  communityId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  token?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  discordUrl?: InputMaybe<Scalars['String']['input']>
  githubUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  telegramUrl?: InputMaybe<Scalars['String']['input']>
  twitterUrl?: InputMaybe<Scalars['String']['input']>
  websiteUrl?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateCommunityMemberInput = {
  role: CommunityRole
}

export type AdminUpdateNetworkInput = {
  endpoint?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateNetworkTokenInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateRuleInput = {
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']['input']>
}

export type AppConfig = {
  __typename?: 'AppConfig'
  authLinkProviders?: Maybe<Array<IdentityProvider>>
  authLoginProviders?: Maybe<Array<IdentityProvider>>
  authPasswordEnabled: Scalars['Boolean']['output']
  authRegisterEnabled: Scalars['Boolean']['output']
}

export type Bot = {
  __typename?: 'Bot'
  application?: Maybe<Scalars['JSON']['output']>
  avatarUrl?: Maybe<Scalars['String']['output']>
  communityId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developersUrl: Scalars['String']['output']
  id: Scalars['String']['output']
  inviteUrl: Scalars['String']['output']
  name: Scalars['String']['output']
  permissions?: Maybe<Array<BotPermission>>
  redirectUrl: Scalars['String']['output']
  redirectUrlSet?: Maybe<Scalars['Boolean']['output']>
  started: Scalars['Boolean']['output']
  status: BotStatus
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  verificationUrl: Scalars['String']['output']
  verificationUrlSet?: Maybe<Scalars['Boolean']['output']>
}

export type BotMember = {
  __typename?: 'BotMember'
  botId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  identity?: Maybe<Identity>
  identityProvider: IdentityProvider
  serverId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  userId: Scalars['String']['output']
}

export type BotPaging = {
  __typename?: 'BotPaging'
  data: Array<Bot>
  meta: PagingMeta
}

export type BotPermission = {
  __typename?: 'BotPermission'
  botId?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  role?: Maybe<DiscordRole>
  roleId?: Maybe<Scalars['String']['output']>
  rules?: Maybe<Array<Rule>>
  server?: Maybe<DiscordServer>
  serverId?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export enum BotStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export type Community = {
  __typename?: 'Community'
  avatarUrl?: Maybe<Scalars['String']['output']>
  cluster: NetworkCluster
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  discordUrl?: Maybe<Scalars['String']['output']>
  githubUrl?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  telegramUrl?: Maybe<Scalars['String']['output']>
  twitterUrl?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  websiteUrl?: Maybe<Scalars['String']['output']>
}

export type CommunityMember = {
  __typename?: 'CommunityMember'
  communityId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  role: CommunityRole
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  userId: Scalars['String']['output']
}

export type CommunityMemberPaging = {
  __typename?: 'CommunityMemberPaging'
  data: Array<CommunityMember>
  meta: PagingMeta
}

export type CommunityPaging = {
  __typename?: 'CommunityPaging'
  data: Array<Community>
  meta: PagingMeta
}

export enum CommunityRole {
  Admin = 'Admin',
  Member = 'Member',
}

export type DiscordRole = {
  __typename?: 'DiscordRole'
  color: Scalars['Int']['output']
  id: Scalars['String']['output']
  managed: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  position: Scalars['Int']['output']
}

export type DiscordServer = {
  __typename?: 'DiscordServer'
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  permissions?: Maybe<Array<Scalars['String']['output']>>
}

export type Identity = {
  __typename?: 'Identity'
  avatarUrl?: Maybe<Scalars['String']['output']>
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']['output']>
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  url?: Maybe<Scalars['String']['output']>
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type IdentityChallenge = {
  __typename?: 'IdentityChallenge'
  challenge: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  ip: Scalars['String']['output']
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  signature?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  userAgent: Scalars['String']['output']
  verified: Scalars['Boolean']['output']
}

export enum IdentityProvider {
  Discord = 'Discord',
  GitHub = 'GitHub',
  Google = 'Google',
  Solana = 'Solana',
  Twitter = 'Twitter',
}

export type LinkIdentityInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type Log = {
  __typename?: 'Log'
  botId?: Maybe<Scalars['String']['output']>
  communityId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  data?: Maybe<Scalars['JSON']['output']>
  id: Scalars['String']['output']
  identityProvider?: Maybe<IdentityProvider>
  identityProviderId?: Maybe<Scalars['String']['output']>
  level: LogLevel
  message: Scalars['String']['output']
  relatedId?: Maybe<Scalars['String']['output']>
  relatedType?: Maybe<LogRelatedType>
  ruleId?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  userId?: Maybe<Scalars['String']['output']>
}

export enum LogLevel {
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning',
}

export type LogPaging = {
  __typename?: 'LogPaging'
  data: Array<Log>
  meta: PagingMeta
}

export enum LogRelatedType {
  Bot = 'Bot',
  Community = 'Community',
  Identity = 'Identity',
  Rule = 'Rule',
  User = 'User',
}

export type LoginInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminCreateBackup: Scalars['Boolean']['output']
  adminCreateBot?: Maybe<Bot>
  adminCreateCommunity?: Maybe<Community>
  adminCreateCommunityMember?: Maybe<CommunityMember>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateNetwork?: Maybe<Network>
  adminCreateNetworkToken?: Maybe<NetworkToken>
  adminCreateRule?: Maybe<Rule>
  adminCreateUser?: Maybe<User>
  adminDeleteBackup: Scalars['Boolean']['output']
  adminDeleteBot?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunityMember?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteLog?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetwork?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetworkToken?: Maybe<Scalars['Boolean']['output']>
  adminDeleteRule?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminFetchBackup: Scalars['Boolean']['output']
  adminRestoreBackup: Scalars['Boolean']['output']
  adminUpdateBot?: Maybe<Bot>
  adminUpdateCommunity?: Maybe<Community>
  adminUpdateCommunityMember?: Maybe<CommunityMember>
  adminUpdateNetwork?: Maybe<Network>
  adminUpdateNetworkToken?: Maybe<NetworkToken>
  adminUpdateNetworkTokenMetadata?: Maybe<NetworkToken>
  adminUpdateRule?: Maybe<Rule>
  adminUpdateUser?: Maybe<User>
  anonVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  register?: Maybe<User>
  userCreateBot?: Maybe<Bot>
  userCreateCommunity?: Maybe<Community>
  userCreateCommunityMember?: Maybe<CommunityMember>
  userCreateRule?: Maybe<Rule>
  userCreateRuleCondition?: Maybe<RuleCondition>
  userCreateRulePermission?: Maybe<RulePermission>
  userDeleteBot?: Maybe<Scalars['Boolean']['output']>
  userDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  userDeleteCommunityMember?: Maybe<Scalars['Boolean']['output']>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userDeleteLog?: Maybe<Scalars['Boolean']['output']>
  userDeleteRule?: Maybe<Scalars['Boolean']['output']>
  userDeleteRuleCondition?: Maybe<Scalars['Boolean']['output']>
  userDeleteRulePermission?: Maybe<Scalars['Boolean']['output']>
  userLeaveBotServer?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userStartBot?: Maybe<Scalars['Boolean']['output']>
  userStopBot?: Maybe<Scalars['Boolean']['output']>
  userSyncBotServer?: Maybe<Scalars['Boolean']['output']>
  userUpdateBot?: Maybe<Bot>
  userUpdateCommunity?: Maybe<Community>
  userUpdateCommunityMember?: Maybe<CommunityMember>
  userUpdateRule?: Maybe<Rule>
  userUpdateRuleCondition?: Maybe<RuleCondition>
  userUpdateUser?: Maybe<User>
  userValidateRule?: Maybe<Array<RuleCondition>>
  userValidateRules?: Maybe<Scalars['JSON']['output']>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminCreateBotArgs = {
  input: AdminCreateBotInput
}

export type MutationAdminCreateCommunityArgs = {
  input: AdminCreateCommunityInput
}

export type MutationAdminCreateCommunityMemberArgs = {
  input: AdminCreateCommunityMemberInput
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateNetworkArgs = {
  input: AdminCreateNetworkInput
}

export type MutationAdminCreateNetworkTokenArgs = {
  input: AdminCreateNetworkTokenInput
}

export type MutationAdminCreateRuleArgs = {
  input: AdminCreateRuleInput
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteBackupArgs = {
  name: Scalars['String']['input']
}

export type MutationAdminDeleteBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationAdminDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationAdminDeleteCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminDeleteLogArgs = {
  logId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkTokenArgs = {
  networkTokenId: Scalars['String']['input']
}

export type MutationAdminDeleteRuleArgs = {
  ruleId: Scalars['String']['input']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationAdminFetchBackupArgs = {
  url: Scalars['String']['input']
}

export type MutationAdminRestoreBackupArgs = {
  name: Scalars['String']['input']
}

export type MutationAdminUpdateBotArgs = {
  botId: Scalars['String']['input']
  input: AdminUpdateBotInput
}

export type MutationAdminUpdateCommunityArgs = {
  communityId: Scalars['String']['input']
  input: AdminUpdateCommunityInput
}

export type MutationAdminUpdateCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
  input: AdminUpdateCommunityMemberInput
}

export type MutationAdminUpdateNetworkArgs = {
  input: AdminUpdateNetworkInput
  networkId: Scalars['String']['input']
}

export type MutationAdminUpdateNetworkTokenArgs = {
  input: AdminUpdateNetworkTokenInput
  networkTokenId: Scalars['String']['input']
}

export type MutationAdminUpdateNetworkTokenMetadataArgs = {
  networkTokenId: Scalars['String']['input']
}

export type MutationAdminUpdateRuleArgs = {
  input: AdminUpdateRuleInput
  ruleId: Scalars['String']['input']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']['input']
}

export type MutationAnonVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationUserCreateBotArgs = {
  input: UserCreateBotInput
}

export type MutationUserCreateCommunityArgs = {
  input: UserCreateCommunityInput
}

export type MutationUserCreateCommunityMemberArgs = {
  input: UserCreateCommunityMemberInput
}

export type MutationUserCreateRuleArgs = {
  input: UserCreateRuleInput
}

export type MutationUserCreateRuleConditionArgs = {
  input: UserCreateRuleConditionInput
}

export type MutationUserCreateRulePermissionArgs = {
  input: UserCreateRulePermissionInput
}

export type MutationUserDeleteBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationUserDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationUserDeleteCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserDeleteLogArgs = {
  logId: Scalars['String']['input']
}

export type MutationUserDeleteRuleArgs = {
  ruleId: Scalars['String']['input']
}

export type MutationUserDeleteRuleConditionArgs = {
  ruleConditionId: Scalars['String']['input']
}

export type MutationUserDeleteRulePermissionArgs = {
  rulePermissionId: Scalars['String']['input']
}

export type MutationUserLeaveBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserStartBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationUserStopBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationUserSyncBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationUserUpdateBotArgs = {
  botId: Scalars['String']['input']
  input: UserUpdateBotInput
}

export type MutationUserUpdateCommunityArgs = {
  communityId: Scalars['String']['input']
  input: UserUpdateCommunityInput
}

export type MutationUserUpdateCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
  input: UserUpdateCommunityMemberInput
}

export type MutationUserUpdateRuleArgs = {
  input: UserUpdateRuleInput
  ruleId: Scalars['String']['input']
}

export type MutationUserUpdateRuleConditionArgs = {
  input: UserUpdateRuleConditionInput
  ruleConditionId: Scalars['String']['input']
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserValidateRuleArgs = {
  address: Scalars['String']['input']
  ruleId: Scalars['String']['input']
}

export type MutationUserValidateRulesArgs = {
  communityId: Scalars['String']['input']
}

export type MutationUserVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type Network = {
  __typename?: 'Network'
  cluster: NetworkCluster
  createdAt?: Maybe<Scalars['DateTime']['output']>
  decimals: Scalars['Int']['output']
  endpoint: Scalars['String']['output']
  explorerUrl: Scalars['String']['output']
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  symbol: Scalars['String']['output']
  type: NetworkType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type NetworkAsset = {
  __typename?: 'NetworkAsset'
  accounts: Array<Scalars['String']['output']>
  amount: Scalars['String']['output']
  group?: Maybe<Scalars['String']['output']>
  owner: Scalars['String']['output']
}

export enum NetworkCluster {
  SolanaCustom = 'SolanaCustom',
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
  SolanaTestnet = 'SolanaTestnet',
}

export type NetworkPaging = {
  __typename?: 'NetworkPaging'
  data: Array<Network>
  meta: PagingMeta
}

export type NetworkToken = {
  __typename?: 'NetworkToken'
  account: Scalars['String']['output']
  cluster: NetworkCluster
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  metadataUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  program: Scalars['String']['output']
  raw?: Maybe<Scalars['JSON']['output']>
  symbol?: Maybe<Scalars['String']['output']>
  type: NetworkTokenType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type NetworkTokenPaging = {
  __typename?: 'NetworkTokenPaging'
  data: Array<NetworkToken>
  meta: PagingMeta
}

export enum NetworkTokenType {
  Fungible = 'Fungible',
  NonFungible = 'NonFungible',
  Unknown = 'Unknown',
}

export enum NetworkType {
  Solana = 'Solana',
}

export type PagingMeta = {
  __typename?: 'PagingMeta'
  currentPage: Scalars['Int']['output']
  isFirstPage: Scalars['Boolean']['output']
  isLastPage: Scalars['Boolean']['output']
  nextPage?: Maybe<Scalars['Int']['output']>
  pageCount?: Maybe<Scalars['Int']['output']>
  previousPage?: Maybe<Scalars['Int']['output']>
  totalCount?: Maybe<Scalars['Int']['output']>
}

export type Query = {
  __typename?: 'Query'
  adminFindManyBot: BotPaging
  adminFindManyCommunity: CommunityPaging
  adminFindManyCommunityMember: CommunityMemberPaging
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyLog: LogPaging
  adminFindManyNetwork: NetworkPaging
  adminFindManyNetworkToken: NetworkTokenPaging
  adminFindManyRule: RulePaging
  adminFindManyUser: UserPaging
  adminFindOneBot?: Maybe<Bot>
  adminFindOneCommunity?: Maybe<Community>
  adminFindOneCommunityMember?: Maybe<CommunityMember>
  adminFindOneLog?: Maybe<Log>
  adminFindOneNetwork?: Maybe<Network>
  adminFindOneNetworkToken?: Maybe<NetworkToken>
  adminFindOneRule?: Maybe<Rule>
  adminFindOneUser?: Maybe<User>
  adminGetBackup?: Maybe<Scalars['JSON']['output']>
  adminGetBackups: Array<Scalars['String']['output']>
  anonFindUserByIdentity?: Maybe<User>
  anonRequestIdentityChallenge?: Maybe<IdentityChallenge>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyCommunity: CommunityPaging
  userFindManyCommunityMember: CommunityMemberPaging
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyLog: LogPaging
  userFindManyNetworkToken: NetworkTokenPaging
  userFindManyRule: RulePaging
  userFindManyUser: UserPaging
  userFindOneBot?: Maybe<Bot>
  userFindOneCommunity?: Maybe<Community>
  userFindOneCommunityMember?: Maybe<CommunityMember>
  userFindOneLog?: Maybe<Log>
  userFindOneRule?: Maybe<Rule>
  userFindOneUser?: Maybe<User>
  userGetBotMembers?: Maybe<Array<BotMember>>
  userGetBotRoles?: Maybe<Array<DiscordRole>>
  userGetBotServer?: Maybe<DiscordServer>
  userGetBotServers?: Maybe<Array<DiscordServer>>
  userGetTokenAccounts?: Maybe<Scalars['JSON']['output']>
  userGetTokenMetadata?: Maybe<Scalars['JSON']['output']>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
}

export type QueryAdminFindManyBotArgs = {
  input: AdminFindManyBotInput
}

export type QueryAdminFindManyCommunityArgs = {
  input: AdminFindManyCommunityInput
}

export type QueryAdminFindManyCommunityMemberArgs = {
  input: AdminFindManyCommunityMemberInput
}

export type QueryAdminFindManyIdentityArgs = {
  input: AdminFindManyIdentityInput
}

export type QueryAdminFindManyLogArgs = {
  input: AdminFindManyLogInput
}

export type QueryAdminFindManyNetworkArgs = {
  input: AdminFindManyNetworkInput
}

export type QueryAdminFindManyNetworkTokenArgs = {
  input: AdminFindManyNetworkTokenInput
}

export type QueryAdminFindManyRuleArgs = {
  input: AdminFindManyRuleInput
}

export type QueryAdminFindManyUserArgs = {
  input: AdminFindManyUserInput
}

export type QueryAdminFindOneBotArgs = {
  botId: Scalars['String']['input']
}

export type QueryAdminFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryAdminFindOneCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type QueryAdminFindOneLogArgs = {
  logId: Scalars['String']['input']
}

export type QueryAdminFindOneNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type QueryAdminFindOneNetworkTokenArgs = {
  networkTokenId: Scalars['String']['input']
}

export type QueryAdminFindOneRuleArgs = {
  ruleId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryAdminGetBackupArgs = {
  name: Scalars['String']['input']
}

export type QueryAnonFindUserByIdentityArgs = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type QueryAnonRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type QueryUserFindManyCommunityArgs = {
  input: UserFindManyCommunityInput
}

export type QueryUserFindManyCommunityMemberArgs = {
  input: UserFindManyCommunityMemberInput
}

export type QueryUserFindManyIdentityArgs = {
  input: UserFindManyIdentityInput
}

export type QueryUserFindManyLogArgs = {
  input: UserFindManyLogInput
}

export type QueryUserFindManyNetworkTokenArgs = {
  input: UserFindManyNetworkTokenInput
}

export type QueryUserFindManyRuleArgs = {
  input: UserFindManyRuleInput
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
}

export type QueryUserFindOneBotArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserFindOneCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type QueryUserFindOneLogArgs = {
  logId: Scalars['String']['input']
}

export type QueryUserFindOneRuleArgs = {
  ruleId: Scalars['String']['input']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
}

export type QueryUserGetBotMembersArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserGetBotRolesArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserGetBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserGetBotServersArgs = {
  botId: Scalars['String']['input']
}

export type QueryUserGetTokenAccountsArgs = {
  account: Scalars['String']['input']
  cluster: NetworkCluster
}

export type QueryUserGetTokenMetadataArgs = {
  account: Scalars['String']['input']
  cluster: NetworkCluster
}

export type QueryUserRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type RegisterInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type RequestIdentityChallengeInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type Rule = {
  __typename?: 'Rule'
  communityId: Scalars['String']['output']
  conditions?: Maybe<Array<RuleCondition>>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  permissions?: Maybe<Array<RulePermission>>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl?: Maybe<Scalars['String']['output']>
}

export type RuleCondition = {
  __typename?: 'RuleCondition'
  account?: Maybe<Scalars['String']['output']>
  amount?: Maybe<Scalars['String']['output']>
  asset?: Maybe<NetworkAsset>
  config?: Maybe<Scalars['JSON']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  filters?: Maybe<Scalars['JSON']['output']>
  id: Scalars['String']['output']
  token?: Maybe<NetworkToken>
  tokenId?: Maybe<Scalars['String']['output']>
  type: RuleConditionType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  valid?: Maybe<Scalars['Boolean']['output']>
}

export enum RuleConditionType {
  AnybodiesAsset = 'AnybodiesAsset',
  SolanaFungibleAsset = 'SolanaFungibleAsset',
  SolanaNonFungibleAsset = 'SolanaNonFungibleAsset',
}

export type RulePaging = {
  __typename?: 'RulePaging'
  data: Array<Rule>
  meta: PagingMeta
}

export type RulePermission = {
  __typename?: 'RulePermission'
  bot?: Maybe<BotPermission>
  botId?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  rule?: Maybe<Rule>
  ruleId?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developer?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  identities?: Maybe<Array<Identity>>
  name?: Maybe<Scalars['String']['output']>
  profileUrl: Scalars['String']['output']
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type UserCreateBotInput = {
  clientId: Scalars['String']['input']
  clientSecret: Scalars['String']['input']
  communityId: Scalars['String']['input']
  token: Scalars['String']['input']
}

export type UserCreateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  cluster: NetworkCluster
  description?: InputMaybe<Scalars['String']['input']>
  discordUrl?: InputMaybe<Scalars['String']['input']>
  githubUrl?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  telegramUrl?: InputMaybe<Scalars['String']['input']>
  twitterUrl?: InputMaybe<Scalars['String']['input']>
  websiteUrl?: InputMaybe<Scalars['String']['input']>
}

export type UserCreateCommunityMemberInput = {
  communityId: Scalars['String']['input']
  role: CommunityRole
  userId: Scalars['String']['input']
}

export type UserCreateRuleConditionInput = {
  account?: InputMaybe<Scalars['String']['input']>
  amount?: InputMaybe<Scalars['String']['input']>
  config?: InputMaybe<Scalars['JSON']['input']>
  filters?: InputMaybe<Scalars['JSON']['input']>
  ruleId: Scalars['String']['input']
  tokenId?: InputMaybe<Scalars['String']['input']>
  type: RuleConditionType
}

export type UserCreateRuleInput = {
  communityId: Scalars['String']['input']
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type UserCreateRulePermissionInput = {
  botId: Scalars['String']['input']
  roleId: Scalars['String']['input']
  ruleId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type UserFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyCommunityMemberInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<CommunityRole>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyIdentityInput = {
  username: Scalars['String']['input']
}

export type UserFindManyLogInput = {
  botId?: InputMaybe<Scalars['String']['input']>
  communityId: Scalars['String']['input']
  identityProvider?: InputMaybe<IdentityProvider>
  identityProviderId?: InputMaybe<Scalars['String']['input']>
  level?: InputMaybe<LogLevel>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  relatedId?: InputMaybe<Scalars['String']['input']>
  relatedType?: InputMaybe<LogRelatedType>
  ruleId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyNetworkTokenInput = {
  cluster: NetworkCluster
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<NetworkTokenType>
}

export type UserFindManyRuleInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserPaging = {
  __typename?: 'UserPaging'
  data: Array<User>
  meta: PagingMeta
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUpdateBotInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  clientId?: InputMaybe<Scalars['String']['input']>
  clientSecret?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  token?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  discordUrl?: InputMaybe<Scalars['String']['input']>
  githubUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  telegramUrl?: InputMaybe<Scalars['String']['input']>
  twitterUrl?: InputMaybe<Scalars['String']['input']>
  websiteUrl?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateCommunityMemberInput = {
  role: CommunityRole
}

export type UserUpdateRuleConditionInput = {
  account?: InputMaybe<Scalars['String']['input']>
  amount?: InputMaybe<Scalars['String']['input']>
  config?: InputMaybe<Scalars['JSON']['input']>
  filters?: InputMaybe<Scalars['JSON']['input']>
  tokenId?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateRuleInput = {
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type VerifyIdentityChallengeInput = {
  challenge: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
  signature: Scalars['String']['input']
  useLedger?: InputMaybe<Scalars['Boolean']['input']>
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminCreateBackupMutationVariables = Exact<{ [key: string]: never }>

export type AdminCreateBackupMutation = { __typename?: 'Mutation'; created: boolean }

export type AdminDeleteBackupMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminDeleteBackupMutation = { __typename?: 'Mutation'; deleted: boolean }

export type AdminFetchBackupMutationVariables = Exact<{
  url: Scalars['String']['input']
}>

export type AdminFetchBackupMutation = { __typename?: 'Mutation'; fetched: boolean }

export type AdminGetBackupQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminGetBackupQuery = { __typename?: 'Query'; item?: any | null }

export type AdminGetBackupsQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetBackupsQuery = { __typename?: 'Query'; items: Array<string> }

export type AdminRestoreBackupMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminRestoreBackupMutation = { __typename?: 'Mutation'; restored: boolean }

export type BotDetailsFragment = {
  __typename?: 'Bot'
  avatarUrl?: string | null
  communityId: string
  createdAt?: Date | null
  developersUrl: string
  id: string
  inviteUrl: string
  name: string
  redirectUrl: string
  redirectUrlSet?: boolean | null
  started: boolean
  status: BotStatus
  updatedAt?: Date | null
  verificationUrl: string
  verificationUrlSet?: boolean | null
  permissions?: Array<{
    __typename?: 'BotPermission'
    botId?: string | null
    createdAt?: Date | null
    id: string
    roleId?: string | null
    serverId?: string | null
    updatedAt?: Date | null
    role?: {
      __typename?: 'DiscordRole'
      id: string
      name: string
      managed: boolean
      color: number
      position: number
    } | null
    server?: {
      __typename?: 'DiscordServer'
      id: string
      name: string
      icon?: string | null
      permissions?: Array<string> | null
    } | null
  }> | null
}

export type BotMemberDetailsFragment = {
  __typename?: 'BotMember'
  id: string
  createdAt?: Date | null
  updatedAt?: Date | null
  botId: string
  userId: string
  serverId: string
  identityProvider: IdentityProvider
  identity?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type BotPermissionDetailsFragment = {
  __typename?: 'BotPermission'
  botId?: string | null
  createdAt?: Date | null
  id: string
  roleId?: string | null
  serverId?: string | null
  updatedAt?: Date | null
  role?: {
    __typename?: 'DiscordRole'
    id: string
    name: string
    managed: boolean
    color: number
    position: number
  } | null
  server?: {
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  } | null
}

export type DiscordServerDetailsFragment = {
  __typename?: 'DiscordServer'
  id: string
  name: string
  icon?: string | null
  permissions?: Array<string> | null
}

export type DiscordRoleDetailsFragment = {
  __typename?: 'DiscordRole'
  id: string
  name: string
  managed: boolean
  color: number
  position: number
}

export type AdminFindManyBotQueryVariables = Exact<{
  input: AdminFindManyBotInput
}>

export type AdminFindManyBotQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'BotPaging'
    data: Array<{
      __typename?: 'Bot'
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      developersUrl: string
      id: string
      inviteUrl: string
      name: string
      redirectUrl: string
      redirectUrlSet?: boolean | null
      started: boolean
      status: BotStatus
      updatedAt?: Date | null
      verificationUrl: string
      verificationUrlSet?: boolean | null
      permissions?: Array<{
        __typename?: 'BotPermission'
        botId?: string | null
        createdAt?: Date | null
        id: string
        roleId?: string | null
        serverId?: string | null
        updatedAt?: Date | null
        role?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneBotQueryVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type AdminFindOneBotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
    permissions?: Array<{
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    }> | null
  } | null
}

export type AdminCreateBotMutationVariables = Exact<{
  input: AdminCreateBotInput
}>

export type AdminCreateBotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
    permissions?: Array<{
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    }> | null
  } | null
}

export type AdminUpdateBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
  input: AdminUpdateBotInput
}>

export type AdminUpdateBotMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
    permissions?: Array<{
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    }> | null
  } | null
}

export type AdminDeleteBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type AdminDeleteBotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindOneBotQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserFindOneBotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
    permissions?: Array<{
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      rules?: Array<{
        __typename?: 'Rule'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        description?: string | null
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RuleCondition'
          createdAt?: Date | null
          id: string
          type: RuleConditionType
          account?: string | null
          amount?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RulePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          ruleId?: string | null
          bot?: {
            __typename?: 'BotPermission'
            botId?: string | null
            createdAt?: Date | null
            id: string
            roleId?: string | null
            serverId?: string | null
            updatedAt?: Date | null
            role?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
      }> | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    }> | null
  } | null
}

export type UserCreateBotMutationVariables = Exact<{
  input: UserCreateBotInput
}>

export type UserCreateBotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
    permissions?: Array<{
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    }> | null
  } | null
}

export type UserUpdateBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
  input: UserUpdateBotInput
}>

export type UserUpdateBotMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
    permissions?: Array<{
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    }> | null
  } | null
}

export type UserDeleteBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserDeleteBotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserStartBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserStartBotMutation = { __typename?: 'Mutation'; started?: boolean | null }

export type UserStopBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserStopBotMutation = { __typename?: 'Mutation'; stopped?: boolean | null }

export type UserLeaveBotServerMutationVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserLeaveBotServerMutation = { __typename?: 'Mutation'; left?: boolean | null }

export type UserSyncBotServerMutationVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserSyncBotServerMutation = { __typename?: 'Mutation'; synced?: boolean | null }

export type UserGetBotMembersQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserGetBotMembersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'BotMember'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    botId: string
    userId: string
    serverId: string
    identityProvider: IdentityProvider
    identity?: {
      __typename?: 'Identity'
      avatarUrl?: string | null
      createdAt?: Date | null
      expired?: boolean | null
      id: string
      name?: string | null
      profile?: any | null
      provider: IdentityProvider
      providerId: string
      updatedAt?: Date | null
      url?: string | null
      verified?: boolean | null
      owner?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  }> | null
}

export type UserGetBotRolesQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserGetBotRolesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordRole'
    id: string
    name: string
    managed: boolean
    color: number
    position: number
  }> | null
}

export type UserGetBotServersQueryVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserGetBotServersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  }> | null
}

export type UserGetBotServerQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserGetBotServerQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  } | null
}

export type CommunityMemberDetailsFragment = {
  __typename?: 'CommunityMember'
  communityId: string
  createdAt?: Date | null
  id: string
  role: CommunityRole
  updatedAt?: Date | null
  userId: string
  user?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminFindManyCommunityMemberQueryVariables = Exact<{
  input: AdminFindManyCommunityMemberInput
}>

export type AdminFindManyCommunityMemberQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityMemberPaging'
    data: Array<{
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      role: CommunityRole
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneCommunityMemberQueryVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type AdminFindOneCommunityMemberQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    role: CommunityRole
    updatedAt?: Date | null
    userId: string
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminCreateCommunityMemberMutationVariables = Exact<{
  input: AdminCreateCommunityMemberInput
}>

export type AdminCreateCommunityMemberMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    role: CommunityRole
    updatedAt?: Date | null
    userId: string
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminUpdateCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
  input: AdminUpdateCommunityMemberInput
}>

export type AdminUpdateCommunityMemberMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    role: CommunityRole
    updatedAt?: Date | null
    userId: string
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminDeleteCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type AdminDeleteCommunityMemberMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyCommunityMemberQueryVariables = Exact<{
  input: UserFindManyCommunityMemberInput
}>

export type UserFindManyCommunityMemberQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityMemberPaging'
    data: Array<{
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      role: CommunityRole
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneCommunityMemberQueryVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type UserFindOneCommunityMemberQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    role: CommunityRole
    updatedAt?: Date | null
    userId: string
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserCreateCommunityMemberMutationVariables = Exact<{
  input: UserCreateCommunityMemberInput
}>

export type UserCreateCommunityMemberMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    role: CommunityRole
    updatedAt?: Date | null
    userId: string
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserUpdateCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
  input: UserUpdateCommunityMemberInput
}>

export type UserUpdateCommunityMemberMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    role: CommunityRole
    updatedAt?: Date | null
    userId: string
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserDeleteCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type UserDeleteCommunityMemberMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type CommunityDetailsFragment = {
  __typename?: 'Community'
  createdAt?: Date | null
  id: string
  name: string
  avatarUrl?: string | null
  description?: string | null
  websiteUrl?: string | null
  discordUrl?: string | null
  githubUrl?: string | null
  twitterUrl?: string | null
  telegramUrl?: string | null
  updatedAt?: Date | null
  cluster: NetworkCluster
}

export type AdminFindManyCommunityQueryVariables = Exact<{
  input: AdminFindManyCommunityInput
}>

export type AdminFindManyCommunityQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityPaging'
    data: Array<{
      __typename?: 'Community'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      description?: string | null
      websiteUrl?: string | null
      discordUrl?: string | null
      githubUrl?: string | null
      twitterUrl?: string | null
      telegramUrl?: string | null
      updatedAt?: Date | null
      cluster: NetworkCluster
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneCommunityQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminFindOneCommunityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    cluster: NetworkCluster
  } | null
}

export type AdminCreateCommunityMutationVariables = Exact<{
  input: AdminCreateCommunityInput
}>

export type AdminCreateCommunityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    cluster: NetworkCluster
  } | null
}

export type AdminUpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: AdminUpdateCommunityInput
}>

export type AdminUpdateCommunityMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    cluster: NetworkCluster
  } | null
}

export type AdminDeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminDeleteCommunityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyCommunityQueryVariables = Exact<{
  input: UserFindManyCommunityInput
}>

export type UserFindManyCommunityQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityPaging'
    data: Array<{
      __typename?: 'Community'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      description?: string | null
      websiteUrl?: string | null
      discordUrl?: string | null
      githubUrl?: string | null
      twitterUrl?: string | null
      telegramUrl?: string | null
      updatedAt?: Date | null
      cluster: NetworkCluster
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneCommunityQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserFindOneCommunityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    cluster: NetworkCluster
  } | null
}

export type UserCreateCommunityMutationVariables = Exact<{
  input: UserCreateCommunityInput
}>

export type UserCreateCommunityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    cluster: NetworkCluster
  } | null
}

export type UserUpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: UserUpdateCommunityInput
}>

export type UserUpdateCommunityMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    cluster: NetworkCluster
  } | null
}

export type UserDeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserDeleteCommunityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  authLinkProviders?: Array<IdentityProvider> | null
  authLoginProviders?: Array<IdentityProvider> | null
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
}

export type PagingMetaDetailsFragment = {
  __typename?: 'PagingMeta'
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  nextPage?: number | null
  pageCount?: number | null
  previousPage?: number | null
  totalCount?: number | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type AppConfigQueryVariables = Exact<{ [key: string]: never }>

export type AppConfigQuery = {
  __typename?: 'Query'
  config: {
    __typename?: 'AppConfig'
    authLinkProviders?: Array<IdentityProvider> | null
    authLoginProviders?: Array<IdentityProvider> | null
    authPasswordEnabled: boolean
    authRegisterEnabled: boolean
  }
}

export type IdentitySummaryFragment = {
  __typename?: 'Identity'
  avatarUrl?: string | null
  id: string
  name?: string | null
  provider: IdentityProvider
  providerId: string
}

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  avatarUrl?: string | null
  createdAt?: Date | null
  expired?: boolean | null
  id: string
  name?: string | null
  profile?: any | null
  provider: IdentityProvider
  providerId: string
  updatedAt?: Date | null
  url?: string | null
  verified?: boolean | null
}

export type IdentityChallengeDetailsFragment = {
  __typename?: 'IdentityChallenge'
  id: string
  createdAt: Date
  updatedAt: Date
  provider: IdentityProvider
  providerId: string
  challenge: string
  signature?: string | null
  ip: string
  userAgent: string
  verified: boolean
}

export type AdminFindManyIdentityQueryVariables = Exact<{
  input: AdminFindManyIdentityInput
}>

export type AdminFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
    challenges?: Array<{
      __typename?: 'IdentityChallenge'
      id: string
      createdAt: Date
      updatedAt: Date
      provider: IdentityProvider
      providerId: string
      challenge: string
      signature?: string | null
      ip: string
      userAgent: string
      verified: boolean
    }> | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminCreateIdentityMutationVariables = Exact<{
  input: AdminCreateIdentityInput
}>

export type AdminCreateIdentityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
  } | null
}

export type AdminDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type AdminDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyIdentityQueryVariables = Exact<{
  input: UserFindManyIdentityInput
}>

export type UserFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
  }> | null
}

export type UserDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type UserRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type UserVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserLinkIdentityMutationVariables = Exact<{
  input: LinkIdentityInput
}>

export type UserLinkIdentityMutation = {
  __typename?: 'Mutation'
  linked?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
  } | null
}

export type AnonRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type AnonRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type AnonFindUserByIdentityQueryVariables = Exact<{
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}>

export type AnonFindUserByIdentityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      avatarUrl?: string | null
      id: string
      name?: string | null
      provider: IdentityProvider
      providerId: string
    }> | null
  } | null
}

export type AnonVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type AnonVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type LogDetailsFragment = {
  __typename?: 'Log'
  createdAt?: Date | null
  id: string
  message: string
  level: LogLevel
  relatedId?: string | null
  relatedType?: LogRelatedType | null
  communityId: string
  identityProvider?: IdentityProvider | null
  identityProviderId?: string | null
  botId?: string | null
  userId?: string | null
  ruleId?: string | null
  updatedAt?: Date | null
  data?: any | null
}

export type UserFindManyLogQueryVariables = Exact<{
  input: UserFindManyLogInput
}>

export type UserFindManyLogQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'LogPaging'
    data: Array<{
      __typename?: 'Log'
      createdAt?: Date | null
      id: string
      message: string
      level: LogLevel
      relatedId?: string | null
      relatedType?: LogRelatedType | null
      communityId: string
      identityProvider?: IdentityProvider | null
      identityProviderId?: string | null
      botId?: string | null
      userId?: string | null
      ruleId?: string | null
      updatedAt?: Date | null
      data?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneLogQueryVariables = Exact<{
  logId: Scalars['String']['input']
}>

export type UserFindOneLogQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Log'
    createdAt?: Date | null
    id: string
    message: string
    level: LogLevel
    relatedId?: string | null
    relatedType?: LogRelatedType | null
    communityId: string
    identityProvider?: IdentityProvider | null
    identityProviderId?: string | null
    botId?: string | null
    userId?: string | null
    ruleId?: string | null
    updatedAt?: Date | null
    data?: any | null
  } | null
}

export type UserDeleteLogMutationVariables = Exact<{
  logId: Scalars['String']['input']
}>

export type UserDeleteLogMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyLogQueryVariables = Exact<{
  input: AdminFindManyLogInput
}>

export type AdminFindManyLogQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'LogPaging'
    data: Array<{
      __typename?: 'Log'
      createdAt?: Date | null
      id: string
      message: string
      level: LogLevel
      relatedId?: string | null
      relatedType?: LogRelatedType | null
      communityId: string
      identityProvider?: IdentityProvider | null
      identityProviderId?: string | null
      botId?: string | null
      userId?: string | null
      ruleId?: string | null
      updatedAt?: Date | null
      data?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneLogQueryVariables = Exact<{
  logId: Scalars['String']['input']
}>

export type AdminFindOneLogQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Log'
    createdAt?: Date | null
    id: string
    message: string
    level: LogLevel
    relatedId?: string | null
    relatedType?: LogRelatedType | null
    communityId: string
    identityProvider?: IdentityProvider | null
    identityProviderId?: string | null
    botId?: string | null
    userId?: string | null
    ruleId?: string | null
    updatedAt?: Date | null
    data?: any | null
  } | null
}

export type AdminDeleteLogMutationVariables = Exact<{
  logId: Scalars['String']['input']
}>

export type AdminDeleteLogMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type NetworkTokenDetailsFragment = {
  __typename?: 'NetworkToken'
  id: string
  createdAt?: Date | null
  updatedAt?: Date | null
  cluster: NetworkCluster
  type: NetworkTokenType
  account: string
  program: string
  name: string
  symbol?: string | null
  description?: string | null
  imageUrl?: string | null
  metadataUrl?: string | null
  raw?: any | null
}

export type AdminFindManyNetworkTokenQueryVariables = Exact<{
  input: AdminFindManyNetworkTokenInput
}>

export type AdminFindManyNetworkTokenQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkTokenPaging'
    data: Array<{
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneNetworkTokenQueryVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminFindOneNetworkTokenQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminCreateNetworkTokenMutationVariables = Exact<{
  input: AdminCreateNetworkTokenInput
}>

export type AdminCreateNetworkTokenMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminUpdateNetworkTokenMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
  input: AdminUpdateNetworkTokenInput
}>

export type AdminUpdateNetworkTokenMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminUpdateNetworkTokenMetadataMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminUpdateNetworkTokenMetadataMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminDeleteNetworkTokenMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminDeleteNetworkTokenMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyNetworkTokenQueryVariables = Exact<{
  input: UserFindManyNetworkTokenInput
}>

export type UserFindManyNetworkTokenQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkTokenPaging'
    data: Array<{
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type NetworkDetailsFragment = {
  __typename?: 'Network'
  createdAt?: Date | null
  id: string
  cluster: NetworkCluster
  type: NetworkType
  name: string
  decimals: number
  endpoint: string
  explorerUrl: string
  symbol: string
  updatedAt?: Date | null
}

export type AdminFindManyNetworkQueryVariables = Exact<{
  input: AdminFindManyNetworkInput
}>

export type AdminFindManyNetworkQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkPaging'
    data: Array<{
      __typename?: 'Network'
      createdAt?: Date | null
      id: string
      cluster: NetworkCluster
      type: NetworkType
      name: string
      decimals: number
      endpoint: string
      explorerUrl: string
      symbol: string
      updatedAt?: Date | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneNetworkQueryVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminFindOneNetworkQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    cluster: NetworkCluster
    type: NetworkType
    name: string
    decimals: number
    endpoint: string
    explorerUrl: string
    symbol: string
    updatedAt?: Date | null
  } | null
}

export type AdminCreateNetworkMutationVariables = Exact<{
  input: AdminCreateNetworkInput
}>

export type AdminCreateNetworkMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    cluster: NetworkCluster
    type: NetworkType
    name: string
    decimals: number
    endpoint: string
    explorerUrl: string
    symbol: string
    updatedAt?: Date | null
  } | null
}

export type AdminUpdateNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
  input: AdminUpdateNetworkInput
}>

export type AdminUpdateNetworkMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    cluster: NetworkCluster
    type: NetworkType
    name: string
    decimals: number
    endpoint: string
    explorerUrl: string
    symbol: string
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminDeleteNetworkMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserGetTokenMetadataQueryVariables = Exact<{
  cluster: NetworkCluster
  account: Scalars['String']['input']
}>

export type UserGetTokenMetadataQuery = { __typename?: 'Query'; result?: any | null }

export type UserGetTokenAccountsQueryVariables = Exact<{
  cluster: NetworkCluster
  account: Scalars['String']['input']
}>

export type UserGetTokenAccountsQuery = { __typename?: 'Query'; result?: any | null }

export type RuleDetailsFragment = {
  __typename?: 'Rule'
  createdAt?: Date | null
  id: string
  communityId: string
  name: string
  description?: string | null
  updatedAt?: Date | null
  viewUrl?: string | null
  conditions?: Array<{
    __typename?: 'RuleCondition'
    createdAt?: Date | null
    id: string
    type: RuleConditionType
    account?: string | null
    amount?: string | null
    filters?: any | null
    config?: any | null
    tokenId?: string | null
    updatedAt?: Date | null
    valid?: boolean | null
    token?: {
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    } | null
    asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
  }> | null
  permissions?: Array<{
    __typename?: 'RulePermission'
    createdAt?: Date | null
    id: string
    updatedAt?: Date | null
    botId?: string | null
    ruleId?: string | null
    bot?: {
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    } | null
  }> | null
}

export type RuleConditionDetailsFragment = {
  __typename?: 'RuleCondition'
  createdAt?: Date | null
  id: string
  type: RuleConditionType
  account?: string | null
  amount?: string | null
  filters?: any | null
  config?: any | null
  tokenId?: string | null
  updatedAt?: Date | null
  valid?: boolean | null
  token?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
  asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
}

export type RulePermissionDetailsFragment = {
  __typename?: 'RulePermission'
  createdAt?: Date | null
  id: string
  updatedAt?: Date | null
  botId?: string | null
  ruleId?: string | null
  bot?: {
    __typename?: 'BotPermission'
    botId?: string | null
    createdAt?: Date | null
    id: string
    roleId?: string | null
    serverId?: string | null
    updatedAt?: Date | null
    role?: {
      __typename?: 'DiscordRole'
      id: string
      name: string
      managed: boolean
      color: number
      position: number
    } | null
    server?: {
      __typename?: 'DiscordServer'
      id: string
      name: string
      icon?: string | null
      permissions?: Array<string> | null
    } | null
  } | null
}

export type AdminFindManyRuleQueryVariables = Exact<{
  input: AdminFindManyRuleInput
}>

export type AdminFindManyRuleQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'RulePaging'
    data: Array<{
      __typename?: 'Rule'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      description?: string | null
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RuleCondition'
        createdAt?: Date | null
        id: string
        type: RuleConditionType
        account?: string | null
        amount?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RulePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        ruleId?: string | null
        bot?: {
          __typename?: 'BotPermission'
          botId?: string | null
          createdAt?: Date | null
          id: string
          roleId?: string | null
          serverId?: string | null
          updatedAt?: Date | null
          role?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneRuleQueryVariables = Exact<{
  ruleId: Scalars['String']['input']
}>

export type AdminFindOneRuleQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Rule'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    description?: string | null
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      type: RuleConditionType
      account?: string | null
      amount?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RulePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      ruleId?: string | null
      bot?: {
        __typename?: 'BotPermission'
        botId?: string | null
        createdAt?: Date | null
        id: string
        roleId?: string | null
        serverId?: string | null
        updatedAt?: Date | null
        role?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
  } | null
}

export type AdminCreateRuleMutationVariables = Exact<{
  input: AdminCreateRuleInput
}>

export type AdminCreateRuleMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Rule'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    description?: string | null
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      type: RuleConditionType
      account?: string | null
      amount?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RulePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      ruleId?: string | null
      bot?: {
        __typename?: 'BotPermission'
        botId?: string | null
        createdAt?: Date | null
        id: string
        roleId?: string | null
        serverId?: string | null
        updatedAt?: Date | null
        role?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
  } | null
}

export type AdminUpdateRuleMutationVariables = Exact<{
  ruleId: Scalars['String']['input']
  input: AdminUpdateRuleInput
}>

export type AdminUpdateRuleMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Rule'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    description?: string | null
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      type: RuleConditionType
      account?: string | null
      amount?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RulePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      ruleId?: string | null
      bot?: {
        __typename?: 'BotPermission'
        botId?: string | null
        createdAt?: Date | null
        id: string
        roleId?: string | null
        serverId?: string | null
        updatedAt?: Date | null
        role?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
  } | null
}

export type AdminDeleteRuleMutationVariables = Exact<{
  ruleId: Scalars['String']['input']
}>

export type AdminDeleteRuleMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyRuleQueryVariables = Exact<{
  input: UserFindManyRuleInput
}>

export type UserFindManyRuleQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'RulePaging'
    data: Array<{
      __typename?: 'Rule'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      description?: string | null
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RuleCondition'
        createdAt?: Date | null
        id: string
        type: RuleConditionType
        account?: string | null
        amount?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RulePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        ruleId?: string | null
        bot?: {
          __typename?: 'BotPermission'
          botId?: string | null
          createdAt?: Date | null
          id: string
          roleId?: string | null
          serverId?: string | null
          updatedAt?: Date | null
          role?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneRuleQueryVariables = Exact<{
  ruleId: Scalars['String']['input']
}>

export type UserFindOneRuleQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Rule'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    description?: string | null
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      type: RuleConditionType
      account?: string | null
      amount?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RulePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      ruleId?: string | null
      bot?: {
        __typename?: 'BotPermission'
        botId?: string | null
        createdAt?: Date | null
        id: string
        roleId?: string | null
        serverId?: string | null
        updatedAt?: Date | null
        role?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
  } | null
}

export type UserCreateRuleMutationVariables = Exact<{
  input: UserCreateRuleInput
}>

export type UserCreateRuleMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Rule'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    description?: string | null
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      type: RuleConditionType
      account?: string | null
      amount?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RulePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      ruleId?: string | null
      bot?: {
        __typename?: 'BotPermission'
        botId?: string | null
        createdAt?: Date | null
        id: string
        roleId?: string | null
        serverId?: string | null
        updatedAt?: Date | null
        role?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
  } | null
}

export type UserCreateRuleConditionMutationVariables = Exact<{
  input: UserCreateRuleConditionInput
}>

export type UserCreateRuleConditionMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'RuleCondition'
    createdAt?: Date | null
    id: string
    type: RuleConditionType
    account?: string | null
    amount?: string | null
    filters?: any | null
    config?: any | null
    tokenId?: string | null
    updatedAt?: Date | null
    valid?: boolean | null
    token?: {
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    } | null
    asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
  } | null
}

export type UserCreateRulePermissionMutationVariables = Exact<{
  input: UserCreateRulePermissionInput
}>

export type UserCreateRulePermissionMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'RulePermission'
    createdAt?: Date | null
    id: string
    updatedAt?: Date | null
    botId?: string | null
    ruleId?: string | null
    bot?: {
      __typename?: 'BotPermission'
      botId?: string | null
      createdAt?: Date | null
      id: string
      roleId?: string | null
      serverId?: string | null
      updatedAt?: Date | null
      role?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    } | null
  } | null
}

export type UserUpdateRuleMutationVariables = Exact<{
  ruleId: Scalars['String']['input']
  input: UserUpdateRuleInput
}>

export type UserUpdateRuleMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Rule'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    description?: string | null
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      type: RuleConditionType
      account?: string | null
      amount?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RulePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      ruleId?: string | null
      bot?: {
        __typename?: 'BotPermission'
        botId?: string | null
        createdAt?: Date | null
        id: string
        roleId?: string | null
        serverId?: string | null
        updatedAt?: Date | null
        role?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
  } | null
}

export type UserUpdateRuleConditionMutationVariables = Exact<{
  ruleConditionId: Scalars['String']['input']
  input: UserUpdateRuleConditionInput
}>

export type UserUpdateRuleConditionMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'RuleCondition'
    createdAt?: Date | null
    id: string
    type: RuleConditionType
    account?: string | null
    amount?: string | null
    filters?: any | null
    config?: any | null
    tokenId?: string | null
    updatedAt?: Date | null
    valid?: boolean | null
    token?: {
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    } | null
    asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
  } | null
}

export type UserDeleteRuleMutationVariables = Exact<{
  ruleId: Scalars['String']['input']
}>

export type UserDeleteRuleMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserDeleteRuleConditionMutationVariables = Exact<{
  ruleConditionId: Scalars['String']['input']
}>

export type UserDeleteRuleConditionMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserDeleteRulePermissionMutationVariables = Exact<{
  rulePermissionId: Scalars['String']['input']
}>

export type UserDeleteRulePermissionMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserValidateRuleMutationVariables = Exact<{
  ruleId: Scalars['String']['input']
  address: Scalars['String']['input']
}>

export type UserValidateRuleMutation = {
  __typename?: 'Mutation'
  result?: Array<{
    __typename?: 'RuleCondition'
    createdAt?: Date | null
    id: string
    type: RuleConditionType
    account?: string | null
    amount?: string | null
    filters?: any | null
    config?: any | null
    tokenId?: string | null
    updatedAt?: Date | null
    valid?: boolean | null
    token?: {
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    } | null
    asset?: { __typename?: 'NetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
  }> | null
}

export type UserValidateRulesMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserValidateRulesMutation = { __typename?: 'Mutation'; result?: any | null }

export type UserSummaryFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  developer?: boolean | null
  id: string
  name?: string | null
  profileUrl: string
  role?: UserRole | null
  username?: string | null
}

export type UserDetailsFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  id: string
  name?: string | null
  profileUrl: string
  role?: UserRole | null
  status?: UserStatus | null
  updatedAt?: Date | null
  username?: string | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyUserQueryVariables = Exact<{
  input: AdminFindManyUserInput
}>

export type AdminFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
      identities?: Array<{
        __typename?: 'Identity'
        avatarUrl?: string | null
        createdAt?: Date | null
        expired?: boolean | null
        id: string
        name?: string | null
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt?: Date | null
        url?: string | null
        verified?: boolean | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneUserQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyUserQueryVariables = Exact<{
  input: UserFindManyUserInput
}>

export type UserFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneUserQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type UserFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export const DiscordRoleDetailsFragmentDoc = gql`
  fragment DiscordRoleDetails on DiscordRole {
    id
    name
    managed
    color
    position
  }
`
export const DiscordServerDetailsFragmentDoc = gql`
  fragment DiscordServerDetails on DiscordServer {
    id
    name
    icon
    permissions
  }
`
export const BotPermissionDetailsFragmentDoc = gql`
  fragment BotPermissionDetails on BotPermission {
    botId
    createdAt
    id
    roleId
    serverId
    updatedAt
    role {
      ...DiscordRoleDetails
    }
    server {
      ...DiscordServerDetails
    }
  }
  ${DiscordRoleDetailsFragmentDoc}
  ${DiscordServerDetailsFragmentDoc}
`
export const BotDetailsFragmentDoc = gql`
  fragment BotDetails on Bot {
    avatarUrl
    communityId
    createdAt
    developersUrl
    id
    inviteUrl
    name
    redirectUrl
    redirectUrlSet
    started
    status
    updatedAt
    verificationUrl
    verificationUrlSet
    permissions {
      ...BotPermissionDetails
    }
  }
  ${BotPermissionDetailsFragmentDoc}
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    avatarUrl
    createdAt
    expired
    id
    name
    profile
    provider
    providerId
    updatedAt
    url
    verified
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    avatarUrl
    createdAt
    developer
    id
    name
    profileUrl
    role
    status
    updatedAt
    username
  }
`
export const BotMemberDetailsFragmentDoc = gql`
  fragment BotMemberDetails on BotMember {
    id
    createdAt
    updatedAt
    botId
    userId
    serverId
    identity {
      ...IdentityDetails
      owner {
        ...UserDetails
      }
    }
    identityProvider
  }
  ${IdentityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const CommunityMemberDetailsFragmentDoc = gql`
  fragment CommunityMemberDetails on CommunityMember {
    communityId
    createdAt
    id
    role
    updatedAt
    user {
      ...UserDetails
    }
    userId
  }
  ${UserDetailsFragmentDoc}
`
export const CommunityDetailsFragmentDoc = gql`
  fragment CommunityDetails on Community {
    createdAt
    id
    name
    avatarUrl
    description
    websiteUrl
    discordUrl
    githubUrl
    twitterUrl
    telegramUrl
    updatedAt
    cluster
  }
`
export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    authLinkProviders
    authLoginProviders
    authPasswordEnabled
    authRegisterEnabled
  }
`
export const PagingMetaDetailsFragmentDoc = gql`
  fragment PagingMetaDetails on PagingMeta {
    currentPage
    isFirstPage
    isLastPage
    nextPage
    pageCount
    previousPage
    totalCount
  }
`
export const IdentitySummaryFragmentDoc = gql`
  fragment IdentitySummary on Identity {
    avatarUrl
    id
    name
    provider
    providerId
  }
`
export const IdentityChallengeDetailsFragmentDoc = gql`
  fragment IdentityChallengeDetails on IdentityChallenge {
    id
    createdAt
    updatedAt
    provider
    providerId
    challenge
    signature
    ip
    userAgent
    verified
  }
`
export const LogDetailsFragmentDoc = gql`
  fragment LogDetails on Log {
    createdAt
    id
    message
    level
    relatedId
    relatedType
    communityId
    identityProvider
    identityProviderId
    botId
    userId
    ruleId
    updatedAt
    data
  }
`
export const NetworkDetailsFragmentDoc = gql`
  fragment NetworkDetails on Network {
    createdAt
    id
    cluster
    type
    name
    decimals
    endpoint
    explorerUrl
    symbol
    updatedAt
  }
`
export const NetworkTokenDetailsFragmentDoc = gql`
  fragment NetworkTokenDetails on NetworkToken {
    id
    createdAt
    updatedAt
    cluster
    type
    account
    program
    name
    symbol
    description
    imageUrl
    metadataUrl
    raw
  }
`
export const RuleConditionDetailsFragmentDoc = gql`
  fragment RuleConditionDetails on RuleCondition {
    createdAt
    id
    type
    account
    amount
    filters
    config
    token {
      ...NetworkTokenDetails
    }
    tokenId
    asset {
      owner
      amount
      accounts
    }
    updatedAt
    valid
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const RulePermissionDetailsFragmentDoc = gql`
  fragment RulePermissionDetails on RulePermission {
    createdAt
    id
    updatedAt
    botId
    ruleId
    bot {
      ...BotPermissionDetails
    }
  }
  ${BotPermissionDetailsFragmentDoc}
`
export const RuleDetailsFragmentDoc = gql`
  fragment RuleDetails on Rule {
    createdAt
    id
    communityId
    name
    description
    conditions {
      ...RuleConditionDetails
    }
    permissions {
      ...RulePermissionDetails
    }
    updatedAt
    viewUrl
  }
  ${RuleConditionDetailsFragmentDoc}
  ${RulePermissionDetailsFragmentDoc}
`
export const UserSummaryFragmentDoc = gql`
  fragment UserSummary on User {
    avatarUrl
    developer
    id
    name
    profileUrl
    role
    username
  }
`
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminCreateBackupDocument = gql`
  mutation adminCreateBackup {
    created: adminCreateBackup
  }
`
export const AdminDeleteBackupDocument = gql`
  mutation adminDeleteBackup($name: String!) {
    deleted: adminDeleteBackup(name: $name)
  }
`
export const AdminFetchBackupDocument = gql`
  mutation adminFetchBackup($url: String!) {
    fetched: adminFetchBackup(url: $url)
  }
`
export const AdminGetBackupDocument = gql`
  query adminGetBackup($name: String!) {
    item: adminGetBackup(name: $name)
  }
`
export const AdminGetBackupsDocument = gql`
  query adminGetBackups {
    items: adminGetBackups
  }
`
export const AdminRestoreBackupDocument = gql`
  mutation adminRestoreBackup($name: String!) {
    restored: adminRestoreBackup(name: $name)
  }
`
export const AdminFindManyBotDocument = gql`
  query adminFindManyBot($input: AdminFindManyBotInput!) {
    paging: adminFindManyBot(input: $input) {
      data {
        ...BotDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${BotDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneBotDocument = gql`
  query adminFindOneBot($botId: String!) {
    item: adminFindOneBot(botId: $botId) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminCreateBotDocument = gql`
  mutation adminCreateBot($input: AdminCreateBotInput!) {
    created: adminCreateBot(input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminUpdateBotDocument = gql`
  mutation adminUpdateBot($botId: String!, $input: AdminUpdateBotInput!) {
    updated: adminUpdateBot(botId: $botId, input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminDeleteBotDocument = gql`
  mutation adminDeleteBot($botId: String!) {
    deleted: adminDeleteBot(botId: $botId)
  }
`
export const UserFindOneBotDocument = gql`
  query userFindOneBot($communityId: String!) {
    item: userFindOneBot(communityId: $communityId) {
      ...BotDetails
      permissions {
        ...BotPermissionDetails
        rules {
          ...RuleDetails
        }
      }
    }
  }
  ${BotDetailsFragmentDoc}
  ${BotPermissionDetailsFragmentDoc}
  ${RuleDetailsFragmentDoc}
`
export const UserCreateBotDocument = gql`
  mutation userCreateBot($input: UserCreateBotInput!) {
    created: userCreateBot(input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const UserUpdateBotDocument = gql`
  mutation userUpdateBot($botId: String!, $input: UserUpdateBotInput!) {
    updated: userUpdateBot(botId: $botId, input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const UserDeleteBotDocument = gql`
  mutation userDeleteBot($botId: String!) {
    deleted: userDeleteBot(botId: $botId)
  }
`
export const UserStartBotDocument = gql`
  mutation userStartBot($botId: String!) {
    started: userStartBot(botId: $botId)
  }
`
export const UserStopBotDocument = gql`
  mutation userStopBot($botId: String!) {
    stopped: userStopBot(botId: $botId)
  }
`
export const UserLeaveBotServerDocument = gql`
  mutation userLeaveBotServer($botId: String!, $serverId: String!) {
    left: userLeaveBotServer(botId: $botId, serverId: $serverId)
  }
`
export const UserSyncBotServerDocument = gql`
  mutation userSyncBotServer($botId: String!, $serverId: String!) {
    synced: userSyncBotServer(botId: $botId, serverId: $serverId)
  }
`
export const UserGetBotMembersDocument = gql`
  query userGetBotMembers($botId: String!, $serverId: String!) {
    items: userGetBotMembers(botId: $botId, serverId: $serverId) {
      ...BotMemberDetails
    }
  }
  ${BotMemberDetailsFragmentDoc}
`
export const UserGetBotRolesDocument = gql`
  query userGetBotRoles($botId: String!, $serverId: String!) {
    items: userGetBotRoles(botId: $botId, serverId: $serverId) {
      ...DiscordRoleDetails
    }
  }
  ${DiscordRoleDetailsFragmentDoc}
`
export const UserGetBotServersDocument = gql`
  query userGetBotServers($botId: String!) {
    items: userGetBotServers(botId: $botId) {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const UserGetBotServerDocument = gql`
  query userGetBotServer($botId: String!, $serverId: String!) {
    item: userGetBotServer(botId: $botId, serverId: $serverId) {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const AdminFindManyCommunityMemberDocument = gql`
  query adminFindManyCommunityMember($input: AdminFindManyCommunityMemberInput!) {
    paging: adminFindManyCommunityMember(input: $input) {
      data {
        ...CommunityMemberDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneCommunityMemberDocument = gql`
  query adminFindOneCommunityMember($communityMemberId: String!) {
    item: adminFindOneCommunityMember(communityMemberId: $communityMemberId) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const AdminCreateCommunityMemberDocument = gql`
  mutation adminCreateCommunityMember($input: AdminCreateCommunityMemberInput!) {
    created: adminCreateCommunityMember(input: $input) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const AdminUpdateCommunityMemberDocument = gql`
  mutation adminUpdateCommunityMember($communityMemberId: String!, $input: AdminUpdateCommunityMemberInput!) {
    updated: adminUpdateCommunityMember(communityMemberId: $communityMemberId, input: $input) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const AdminDeleteCommunityMemberDocument = gql`
  mutation adminDeleteCommunityMember($communityMemberId: String!) {
    deleted: adminDeleteCommunityMember(communityMemberId: $communityMemberId)
  }
`
export const UserFindManyCommunityMemberDocument = gql`
  query userFindManyCommunityMember($input: UserFindManyCommunityMemberInput!) {
    paging: userFindManyCommunityMember(input: $input) {
      data {
        ...CommunityMemberDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneCommunityMemberDocument = gql`
  query userFindOneCommunityMember($communityMemberId: String!) {
    item: userFindOneCommunityMember(communityMemberId: $communityMemberId) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const UserCreateCommunityMemberDocument = gql`
  mutation userCreateCommunityMember($input: UserCreateCommunityMemberInput!) {
    created: userCreateCommunityMember(input: $input) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const UserUpdateCommunityMemberDocument = gql`
  mutation userUpdateCommunityMember($communityMemberId: String!, $input: UserUpdateCommunityMemberInput!) {
    updated: userUpdateCommunityMember(communityMemberId: $communityMemberId, input: $input) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const UserDeleteCommunityMemberDocument = gql`
  mutation userDeleteCommunityMember($communityMemberId: String!) {
    deleted: userDeleteCommunityMember(communityMemberId: $communityMemberId)
  }
`
export const AdminFindManyCommunityDocument = gql`
  query adminFindManyCommunity($input: AdminFindManyCommunityInput!) {
    paging: adminFindManyCommunity(input: $input) {
      data {
        ...CommunityDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneCommunityDocument = gql`
  query adminFindOneCommunity($communityId: String!) {
    item: adminFindOneCommunity(communityId: $communityId) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminCreateCommunityDocument = gql`
  mutation adminCreateCommunity($input: AdminCreateCommunityInput!) {
    created: adminCreateCommunity(input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminUpdateCommunityDocument = gql`
  mutation adminUpdateCommunity($communityId: String!, $input: AdminUpdateCommunityInput!) {
    updated: adminUpdateCommunity(communityId: $communityId, input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminDeleteCommunityDocument = gql`
  mutation adminDeleteCommunity($communityId: String!) {
    deleted: adminDeleteCommunity(communityId: $communityId)
  }
`
export const UserFindManyCommunityDocument = gql`
  query userFindManyCommunity($input: UserFindManyCommunityInput!) {
    paging: userFindManyCommunity(input: $input) {
      data {
        ...CommunityDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneCommunityDocument = gql`
  query userFindOneCommunity($communityId: String!) {
    item: userFindOneCommunity(communityId: $communityId) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const UserCreateCommunityDocument = gql`
  mutation userCreateCommunity($input: UserCreateCommunityInput!) {
    created: userCreateCommunity(input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const UserUpdateCommunityDocument = gql`
  mutation userUpdateCommunity($communityId: String!, $input: UserUpdateCommunityInput!) {
    updated: userUpdateCommunity(communityId: $communityId, input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const UserDeleteCommunityDocument = gql`
  mutation userDeleteCommunity($communityId: String!) {
    deleted: userDeleteCommunity(communityId: $communityId)
  }
`
export const UptimeDocument = gql`
  query uptime {
    uptime
  }
`
export const AppConfigDocument = gql`
  query appConfig {
    config: appConfig {
      ...AppConfigDetails
    }
  }
  ${AppConfigDetailsFragmentDoc}
`
export const AdminFindManyIdentityDocument = gql`
  query adminFindManyIdentity($input: AdminFindManyIdentityInput!) {
    items: adminFindManyIdentity(input: $input) {
      ...IdentityDetails
      challenges {
        ...IdentityChallengeDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityChallengeDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminCreateIdentityDocument = gql`
  mutation adminCreateIdentity($input: AdminCreateIdentityInput!) {
    created: adminCreateIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminDeleteIdentityDocument = gql`
  mutation adminDeleteIdentity($identityId: String!) {
    deleted: adminDeleteIdentity(identityId: $identityId)
  }
`
export const UserFindManyIdentityDocument = gql`
  query userFindManyIdentity($input: UserFindManyIdentityInput!) {
    items: userFindManyIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const UserDeleteIdentityDocument = gql`
  mutation userDeleteIdentity($identityId: String!) {
    deleted: userDeleteIdentity(identityId: $identityId)
  }
`
export const UserRequestIdentityChallengeDocument = gql`
  query userRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: userRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserVerifyIdentityChallengeDocument = gql`
  mutation userVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: userVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserLinkIdentityDocument = gql`
  mutation userLinkIdentity($input: LinkIdentityInput!) {
    linked: userLinkIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AnonRequestIdentityChallengeDocument = gql`
  query anonRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: anonRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const AnonFindUserByIdentityDocument = gql`
  query anonFindUserByIdentity($provider: IdentityProvider!, $providerId: String!) {
    item: anonFindUserByIdentity(provider: $provider, providerId: $providerId) {
      ...UserSummary
      identities {
        ...IdentitySummary
      }
    }
  }
  ${UserSummaryFragmentDoc}
  ${IdentitySummaryFragmentDoc}
`
export const AnonVerifyIdentityChallengeDocument = gql`
  mutation anonVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: anonVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserFindManyLogDocument = gql`
  query userFindManyLog($input: UserFindManyLogInput!) {
    paging: userFindManyLog(input: $input) {
      data {
        ...LogDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${LogDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneLogDocument = gql`
  query userFindOneLog($logId: String!) {
    item: userFindOneLog(logId: $logId) {
      ...LogDetails
    }
  }
  ${LogDetailsFragmentDoc}
`
export const UserDeleteLogDocument = gql`
  mutation userDeleteLog($logId: String!) {
    deleted: userDeleteLog(logId: $logId)
  }
`
export const AdminFindManyLogDocument = gql`
  query adminFindManyLog($input: AdminFindManyLogInput!) {
    paging: adminFindManyLog(input: $input) {
      data {
        ...LogDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${LogDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneLogDocument = gql`
  query adminFindOneLog($logId: String!) {
    item: adminFindOneLog(logId: $logId) {
      ...LogDetails
    }
  }
  ${LogDetailsFragmentDoc}
`
export const AdminDeleteLogDocument = gql`
  mutation adminDeleteLog($logId: String!) {
    deleted: adminDeleteLog(logId: $logId)
  }
`
export const AdminFindManyNetworkTokenDocument = gql`
  query adminFindManyNetworkToken($input: AdminFindManyNetworkTokenInput!) {
    paging: adminFindManyNetworkToken(input: $input) {
      data {
        ...NetworkTokenDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneNetworkTokenDocument = gql`
  query adminFindOneNetworkToken($networkTokenId: String!) {
    item: adminFindOneNetworkToken(networkTokenId: $networkTokenId) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminCreateNetworkTokenDocument = gql`
  mutation adminCreateNetworkToken($input: AdminCreateNetworkTokenInput!) {
    created: adminCreateNetworkToken(input: $input) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminUpdateNetworkTokenDocument = gql`
  mutation adminUpdateNetworkToken($networkTokenId: String!, $input: AdminUpdateNetworkTokenInput!) {
    updated: adminUpdateNetworkToken(networkTokenId: $networkTokenId, input: $input) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminUpdateNetworkTokenMetadataDocument = gql`
  mutation adminUpdateNetworkTokenMetadata($networkTokenId: String!) {
    updated: adminUpdateNetworkTokenMetadata(networkTokenId: $networkTokenId) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminDeleteNetworkTokenDocument = gql`
  mutation adminDeleteNetworkToken($networkTokenId: String!) {
    deleted: adminDeleteNetworkToken(networkTokenId: $networkTokenId)
  }
`
export const UserFindManyNetworkTokenDocument = gql`
  query userFindManyNetworkToken($input: UserFindManyNetworkTokenInput!) {
    paging: userFindManyNetworkToken(input: $input) {
      data {
        ...NetworkTokenDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindManyNetworkDocument = gql`
  query adminFindManyNetwork($input: AdminFindManyNetworkInput!) {
    paging: adminFindManyNetwork(input: $input) {
      data {
        ...NetworkDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneNetworkDocument = gql`
  query adminFindOneNetwork($networkId: String!) {
    item: adminFindOneNetwork(networkId: $networkId) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminCreateNetworkDocument = gql`
  mutation adminCreateNetwork($input: AdminCreateNetworkInput!) {
    created: adminCreateNetwork(input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminUpdateNetworkDocument = gql`
  mutation adminUpdateNetwork($networkId: String!, $input: AdminUpdateNetworkInput!) {
    updated: adminUpdateNetwork(networkId: $networkId, input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminDeleteNetworkDocument = gql`
  mutation adminDeleteNetwork($networkId: String!) {
    deleted: adminDeleteNetwork(networkId: $networkId)
  }
`
export const UserGetTokenMetadataDocument = gql`
  query userGetTokenMetadata($cluster: NetworkCluster!, $account: String!) {
    result: userGetTokenMetadata(cluster: $cluster, account: $account)
  }
`
export const UserGetTokenAccountsDocument = gql`
  query userGetTokenAccounts($cluster: NetworkCluster!, $account: String!) {
    result: userGetTokenAccounts(cluster: $cluster, account: $account)
  }
`
export const AdminFindManyRuleDocument = gql`
  query adminFindManyRule($input: AdminFindManyRuleInput!) {
    paging: adminFindManyRule(input: $input) {
      data {
        ...RuleDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${RuleDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneRuleDocument = gql`
  query adminFindOneRule($ruleId: String!) {
    item: adminFindOneRule(ruleId: $ruleId) {
      ...RuleDetails
    }
  }
  ${RuleDetailsFragmentDoc}
`
export const AdminCreateRuleDocument = gql`
  mutation adminCreateRule($input: AdminCreateRuleInput!) {
    created: adminCreateRule(input: $input) {
      ...RuleDetails
    }
  }
  ${RuleDetailsFragmentDoc}
`
export const AdminUpdateRuleDocument = gql`
  mutation adminUpdateRule($ruleId: String!, $input: AdminUpdateRuleInput!) {
    updated: adminUpdateRule(ruleId: $ruleId, input: $input) {
      ...RuleDetails
    }
  }
  ${RuleDetailsFragmentDoc}
`
export const AdminDeleteRuleDocument = gql`
  mutation adminDeleteRule($ruleId: String!) {
    deleted: adminDeleteRule(ruleId: $ruleId)
  }
`
export const UserFindManyRuleDocument = gql`
  query userFindManyRule($input: UserFindManyRuleInput!) {
    paging: userFindManyRule(input: $input) {
      data {
        ...RuleDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${RuleDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneRuleDocument = gql`
  query userFindOneRule($ruleId: String!) {
    item: userFindOneRule(ruleId: $ruleId) {
      ...RuleDetails
    }
  }
  ${RuleDetailsFragmentDoc}
`
export const UserCreateRuleDocument = gql`
  mutation userCreateRule($input: UserCreateRuleInput!) {
    created: userCreateRule(input: $input) {
      ...RuleDetails
    }
  }
  ${RuleDetailsFragmentDoc}
`
export const UserCreateRuleConditionDocument = gql`
  mutation userCreateRuleCondition($input: UserCreateRuleConditionInput!) {
    created: userCreateRuleCondition(input: $input) {
      ...RuleConditionDetails
    }
  }
  ${RuleConditionDetailsFragmentDoc}
`
export const UserCreateRulePermissionDocument = gql`
  mutation userCreateRulePermission($input: UserCreateRulePermissionInput!) {
    created: userCreateRulePermission(input: $input) {
      ...RulePermissionDetails
    }
  }
  ${RulePermissionDetailsFragmentDoc}
`
export const UserUpdateRuleDocument = gql`
  mutation userUpdateRule($ruleId: String!, $input: UserUpdateRuleInput!) {
    updated: userUpdateRule(ruleId: $ruleId, input: $input) {
      ...RuleDetails
    }
  }
  ${RuleDetailsFragmentDoc}
`
export const UserUpdateRuleConditionDocument = gql`
  mutation userUpdateRuleCondition($ruleConditionId: String!, $input: UserUpdateRuleConditionInput!) {
    updated: userUpdateRuleCondition(ruleConditionId: $ruleConditionId, input: $input) {
      ...RuleConditionDetails
    }
  }
  ${RuleConditionDetailsFragmentDoc}
`
export const UserDeleteRuleDocument = gql`
  mutation userDeleteRule($ruleId: String!) {
    deleted: userDeleteRule(ruleId: $ruleId)
  }
`
export const UserDeleteRuleConditionDocument = gql`
  mutation userDeleteRuleCondition($ruleConditionId: String!) {
    deleted: userDeleteRuleCondition(ruleConditionId: $ruleConditionId)
  }
`
export const UserDeleteRulePermissionDocument = gql`
  mutation userDeleteRulePermission($rulePermissionId: String!) {
    deleted: userDeleteRulePermission(rulePermissionId: $rulePermissionId)
  }
`
export const UserValidateRuleDocument = gql`
  mutation userValidateRule($ruleId: String!, $address: String!) {
    result: userValidateRule(ruleId: $ruleId, address: $address) {
      ...RuleConditionDetails
    }
  }
  ${RuleConditionDetailsFragmentDoc}
`
export const UserValidateRulesDocument = gql`
  mutation userValidateRules($communityId: String!) {
    result: userValidateRules(communityId: $communityId)
  }
`
export const AdminCreateUserDocument = gql`
  mutation adminCreateUser($input: AdminCreateUserInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminDeleteUserDocument = gql`
  mutation adminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId)
  }
`
export const AdminFindManyUserDocument = gql`
  query adminFindManyUser($input: AdminFindManyUserInput!) {
    paging: adminFindManyUser(input: $input) {
      data {
        ...UserDetails
        identities {
          ...IdentityDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneUserDocument = gql`
  query adminFindOneUser($userId: String!) {
    item: adminFindOneUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminUpdateUserDocument = gql`
  mutation adminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserFindManyUserDocument = gql`
  query userFindManyUser($input: UserFindManyUserInput!) {
    paging: userFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneUserDocument = gql`
  query userFindOneUser($username: String!) {
    item: userFindOneUser(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserUpdateUserDocument = gql`
  mutation userUpdateUser($input: UserUpdateUserInput!) {
    updated: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action()
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
const AdminCreateBackupDocumentString = print(AdminCreateBackupDocument)
const AdminDeleteBackupDocumentString = print(AdminDeleteBackupDocument)
const AdminFetchBackupDocumentString = print(AdminFetchBackupDocument)
const AdminGetBackupDocumentString = print(AdminGetBackupDocument)
const AdminGetBackupsDocumentString = print(AdminGetBackupsDocument)
const AdminRestoreBackupDocumentString = print(AdminRestoreBackupDocument)
const AdminFindManyBotDocumentString = print(AdminFindManyBotDocument)
const AdminFindOneBotDocumentString = print(AdminFindOneBotDocument)
const AdminCreateBotDocumentString = print(AdminCreateBotDocument)
const AdminUpdateBotDocumentString = print(AdminUpdateBotDocument)
const AdminDeleteBotDocumentString = print(AdminDeleteBotDocument)
const UserFindOneBotDocumentString = print(UserFindOneBotDocument)
const UserCreateBotDocumentString = print(UserCreateBotDocument)
const UserUpdateBotDocumentString = print(UserUpdateBotDocument)
const UserDeleteBotDocumentString = print(UserDeleteBotDocument)
const UserStartBotDocumentString = print(UserStartBotDocument)
const UserStopBotDocumentString = print(UserStopBotDocument)
const UserLeaveBotServerDocumentString = print(UserLeaveBotServerDocument)
const UserSyncBotServerDocumentString = print(UserSyncBotServerDocument)
const UserGetBotMembersDocumentString = print(UserGetBotMembersDocument)
const UserGetBotRolesDocumentString = print(UserGetBotRolesDocument)
const UserGetBotServersDocumentString = print(UserGetBotServersDocument)
const UserGetBotServerDocumentString = print(UserGetBotServerDocument)
const AdminFindManyCommunityMemberDocumentString = print(AdminFindManyCommunityMemberDocument)
const AdminFindOneCommunityMemberDocumentString = print(AdminFindOneCommunityMemberDocument)
const AdminCreateCommunityMemberDocumentString = print(AdminCreateCommunityMemberDocument)
const AdminUpdateCommunityMemberDocumentString = print(AdminUpdateCommunityMemberDocument)
const AdminDeleteCommunityMemberDocumentString = print(AdminDeleteCommunityMemberDocument)
const UserFindManyCommunityMemberDocumentString = print(UserFindManyCommunityMemberDocument)
const UserFindOneCommunityMemberDocumentString = print(UserFindOneCommunityMemberDocument)
const UserCreateCommunityMemberDocumentString = print(UserCreateCommunityMemberDocument)
const UserUpdateCommunityMemberDocumentString = print(UserUpdateCommunityMemberDocument)
const UserDeleteCommunityMemberDocumentString = print(UserDeleteCommunityMemberDocument)
const AdminFindManyCommunityDocumentString = print(AdminFindManyCommunityDocument)
const AdminFindOneCommunityDocumentString = print(AdminFindOneCommunityDocument)
const AdminCreateCommunityDocumentString = print(AdminCreateCommunityDocument)
const AdminUpdateCommunityDocumentString = print(AdminUpdateCommunityDocument)
const AdminDeleteCommunityDocumentString = print(AdminDeleteCommunityDocument)
const UserFindManyCommunityDocumentString = print(UserFindManyCommunityDocument)
const UserFindOneCommunityDocumentString = print(UserFindOneCommunityDocument)
const UserCreateCommunityDocumentString = print(UserCreateCommunityDocument)
const UserUpdateCommunityDocumentString = print(UserUpdateCommunityDocument)
const UserDeleteCommunityDocumentString = print(UserDeleteCommunityDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminFindManyIdentityDocumentString = print(AdminFindManyIdentityDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const UserFindManyIdentityDocumentString = print(UserFindManyIdentityDocument)
const UserDeleteIdentityDocumentString = print(UserDeleteIdentityDocument)
const UserRequestIdentityChallengeDocumentString = print(UserRequestIdentityChallengeDocument)
const UserVerifyIdentityChallengeDocumentString = print(UserVerifyIdentityChallengeDocument)
const UserLinkIdentityDocumentString = print(UserLinkIdentityDocument)
const AnonRequestIdentityChallengeDocumentString = print(AnonRequestIdentityChallengeDocument)
const AnonFindUserByIdentityDocumentString = print(AnonFindUserByIdentityDocument)
const AnonVerifyIdentityChallengeDocumentString = print(AnonVerifyIdentityChallengeDocument)
const UserFindManyLogDocumentString = print(UserFindManyLogDocument)
const UserFindOneLogDocumentString = print(UserFindOneLogDocument)
const UserDeleteLogDocumentString = print(UserDeleteLogDocument)
const AdminFindManyLogDocumentString = print(AdminFindManyLogDocument)
const AdminFindOneLogDocumentString = print(AdminFindOneLogDocument)
const AdminDeleteLogDocumentString = print(AdminDeleteLogDocument)
const AdminFindManyNetworkTokenDocumentString = print(AdminFindManyNetworkTokenDocument)
const AdminFindOneNetworkTokenDocumentString = print(AdminFindOneNetworkTokenDocument)
const AdminCreateNetworkTokenDocumentString = print(AdminCreateNetworkTokenDocument)
const AdminUpdateNetworkTokenDocumentString = print(AdminUpdateNetworkTokenDocument)
const AdminUpdateNetworkTokenMetadataDocumentString = print(AdminUpdateNetworkTokenMetadataDocument)
const AdminDeleteNetworkTokenDocumentString = print(AdminDeleteNetworkTokenDocument)
const UserFindManyNetworkTokenDocumentString = print(UserFindManyNetworkTokenDocument)
const AdminFindManyNetworkDocumentString = print(AdminFindManyNetworkDocument)
const AdminFindOneNetworkDocumentString = print(AdminFindOneNetworkDocument)
const AdminCreateNetworkDocumentString = print(AdminCreateNetworkDocument)
const AdminUpdateNetworkDocumentString = print(AdminUpdateNetworkDocument)
const AdminDeleteNetworkDocumentString = print(AdminDeleteNetworkDocument)
const UserGetTokenMetadataDocumentString = print(UserGetTokenMetadataDocument)
const UserGetTokenAccountsDocumentString = print(UserGetTokenAccountsDocument)
const AdminFindManyRuleDocumentString = print(AdminFindManyRuleDocument)
const AdminFindOneRuleDocumentString = print(AdminFindOneRuleDocument)
const AdminCreateRuleDocumentString = print(AdminCreateRuleDocument)
const AdminUpdateRuleDocumentString = print(AdminUpdateRuleDocument)
const AdminDeleteRuleDocumentString = print(AdminDeleteRuleDocument)
const UserFindManyRuleDocumentString = print(UserFindManyRuleDocument)
const UserFindOneRuleDocumentString = print(UserFindOneRuleDocument)
const UserCreateRuleDocumentString = print(UserCreateRuleDocument)
const UserCreateRuleConditionDocumentString = print(UserCreateRuleConditionDocument)
const UserCreateRulePermissionDocumentString = print(UserCreateRulePermissionDocument)
const UserUpdateRuleDocumentString = print(UserUpdateRuleDocument)
const UserUpdateRuleConditionDocumentString = print(UserUpdateRuleConditionDocument)
const UserDeleteRuleDocumentString = print(UserDeleteRuleDocument)
const UserDeleteRuleConditionDocumentString = print(UserDeleteRuleConditionDocument)
const UserDeleteRulePermissionDocumentString = print(UserDeleteRulePermissionDocument)
const UserValidateRuleDocumentString = print(UserValidateRuleDocument)
const UserValidateRulesDocumentString = print(UserValidateRulesDocument)
const AdminCreateUserDocumentString = print(AdminCreateUserDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const AdminFindManyUserDocumentString = print(AdminFindManyUserDocument)
const AdminFindOneUserDocumentString = print(AdminFindOneUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const UserFindManyUserDocumentString = print(UserFindManyUserDocument)
const UserFindOneUserDocumentString = print(UserFindOneUserDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(
      variables: LoginMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LoginMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LoginMutation>(LoginDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login',
        'mutation',
        variables,
      )
    },
    logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LogoutMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LogoutMutation>(LogoutDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'logout',
        'mutation',
        variables,
      )
    },
    register(
      variables: RegisterMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RegisterMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RegisterMutation>(RegisterDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'register',
        'mutation',
        variables,
      )
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
        variables,
      )
    },
    adminCreateBackup(
      variables?: AdminCreateBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateBackupMutation>(AdminCreateBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateBackup',
        'mutation',
        variables,
      )
    },
    adminDeleteBackup(
      variables: AdminDeleteBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteBackupMutation>(AdminDeleteBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteBackup',
        'mutation',
        variables,
      )
    },
    adminFetchBackup(
      variables: AdminFetchBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFetchBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFetchBackupMutation>(AdminFetchBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFetchBackup',
        'mutation',
        variables,
      )
    },
    adminGetBackup(
      variables: AdminGetBackupQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetBackupQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetBackupQuery>(AdminGetBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetBackup',
        'query',
        variables,
      )
    },
    adminGetBackups(
      variables?: AdminGetBackupsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetBackupsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetBackupsQuery>(AdminGetBackupsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetBackups',
        'query',
        variables,
      )
    },
    adminRestoreBackup(
      variables: AdminRestoreBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRestoreBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRestoreBackupMutation>(AdminRestoreBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRestoreBackup',
        'mutation',
        variables,
      )
    },
    adminFindManyBot(
      variables: AdminFindManyBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyBotQuery>(AdminFindManyBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyBot',
        'query',
        variables,
      )
    },
    adminFindOneBot(
      variables: AdminFindOneBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneBotQuery>(AdminFindOneBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneBot',
        'query',
        variables,
      )
    },
    adminCreateBot(
      variables: AdminCreateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateBotMutation>(AdminCreateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateBot',
        'mutation',
        variables,
      )
    },
    adminUpdateBot(
      variables: AdminUpdateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateBotMutation>(AdminUpdateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateBot',
        'mutation',
        variables,
      )
    },
    adminDeleteBot(
      variables: AdminDeleteBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteBotMutation>(AdminDeleteBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteBot',
        'mutation',
        variables,
      )
    },
    userFindOneBot(
      variables: UserFindOneBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneBotQuery>(UserFindOneBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneBot',
        'query',
        variables,
      )
    },
    userCreateBot(
      variables: UserCreateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateBotMutation>(UserCreateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateBot',
        'mutation',
        variables,
      )
    },
    userUpdateBot(
      variables: UserUpdateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateBotMutation>(UserUpdateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateBot',
        'mutation',
        variables,
      )
    },
    userDeleteBot(
      variables: UserDeleteBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteBotMutation>(UserDeleteBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteBot',
        'mutation',
        variables,
      )
    },
    userStartBot(
      variables: UserStartBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserStartBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserStartBotMutation>(UserStartBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userStartBot',
        'mutation',
        variables,
      )
    },
    userStopBot(
      variables: UserStopBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserStopBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserStopBotMutation>(UserStopBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userStopBot',
        'mutation',
        variables,
      )
    },
    userLeaveBotServer(
      variables: UserLeaveBotServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserLeaveBotServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserLeaveBotServerMutation>(UserLeaveBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userLeaveBotServer',
        'mutation',
        variables,
      )
    },
    userSyncBotServer(
      variables: UserSyncBotServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserSyncBotServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserSyncBotServerMutation>(UserSyncBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userSyncBotServer',
        'mutation',
        variables,
      )
    },
    userGetBotMembers(
      variables: UserGetBotMembersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotMembersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotMembersQuery>(UserGetBotMembersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotMembers',
        'query',
        variables,
      )
    },
    userGetBotRoles(
      variables: UserGetBotRolesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotRolesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotRolesQuery>(UserGetBotRolesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotRoles',
        'query',
        variables,
      )
    },
    userGetBotServers(
      variables: UserGetBotServersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotServersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotServersQuery>(UserGetBotServersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotServers',
        'query',
        variables,
      )
    },
    userGetBotServer(
      variables: UserGetBotServerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotServerQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotServerQuery>(UserGetBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotServer',
        'query',
        variables,
      )
    },
    adminFindManyCommunityMember(
      variables: AdminFindManyCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCommunityMemberQuery>(AdminFindManyCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCommunityMember',
        'query',
        variables,
      )
    },
    adminFindOneCommunityMember(
      variables: AdminFindOneCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCommunityMemberQuery>(AdminFindOneCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCommunityMember',
        'query',
        variables,
      )
    },
    adminCreateCommunityMember(
      variables: AdminCreateCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateCommunityMemberMutation>(AdminCreateCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateCommunityMember',
        'mutation',
        variables,
      )
    },
    adminUpdateCommunityMember(
      variables: AdminUpdateCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCommunityMemberMutation>(AdminUpdateCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCommunityMember',
        'mutation',
        variables,
      )
    },
    adminDeleteCommunityMember(
      variables: AdminDeleteCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCommunityMemberMutation>(AdminDeleteCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCommunityMember',
        'mutation',
        variables,
      )
    },
    userFindManyCommunityMember(
      variables: UserFindManyCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyCommunityMemberQuery>(UserFindManyCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyCommunityMember',
        'query',
        variables,
      )
    },
    userFindOneCommunityMember(
      variables: UserFindOneCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneCommunityMemberQuery>(UserFindOneCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneCommunityMember',
        'query',
        variables,
      )
    },
    userCreateCommunityMember(
      variables: UserCreateCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateCommunityMemberMutation>(UserCreateCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateCommunityMember',
        'mutation',
        variables,
      )
    },
    userUpdateCommunityMember(
      variables: UserUpdateCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateCommunityMemberMutation>(UserUpdateCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateCommunityMember',
        'mutation',
        variables,
      )
    },
    userDeleteCommunityMember(
      variables: UserDeleteCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteCommunityMemberMutation>(UserDeleteCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteCommunityMember',
        'mutation',
        variables,
      )
    },
    adminFindManyCommunity(
      variables: AdminFindManyCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCommunityQuery>(AdminFindManyCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCommunity',
        'query',
        variables,
      )
    },
    adminFindOneCommunity(
      variables: AdminFindOneCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCommunityQuery>(AdminFindOneCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCommunity',
        'query',
        variables,
      )
    },
    adminCreateCommunity(
      variables: AdminCreateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateCommunityMutation>(AdminCreateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateCommunity',
        'mutation',
        variables,
      )
    },
    adminUpdateCommunity(
      variables: AdminUpdateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCommunityMutation>(AdminUpdateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCommunity',
        'mutation',
        variables,
      )
    },
    adminDeleteCommunity(
      variables: AdminDeleteCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCommunityMutation>(AdminDeleteCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCommunity',
        'mutation',
        variables,
      )
    },
    userFindManyCommunity(
      variables: UserFindManyCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyCommunityQuery>(UserFindManyCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyCommunity',
        'query',
        variables,
      )
    },
    userFindOneCommunity(
      variables: UserFindOneCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneCommunityQuery>(UserFindOneCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneCommunity',
        'query',
        variables,
      )
    },
    userCreateCommunity(
      variables: UserCreateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateCommunityMutation>(UserCreateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateCommunity',
        'mutation',
        variables,
      )
    },
    userUpdateCommunity(
      variables: UserUpdateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateCommunityMutation>(UserUpdateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateCommunity',
        'mutation',
        variables,
      )
    },
    userDeleteCommunity(
      variables: UserDeleteCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteCommunityMutation>(UserDeleteCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteCommunity',
        'mutation',
        variables,
      )
    },
    uptime(
      variables?: UptimeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UptimeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UptimeQuery>(UptimeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'uptime',
        'query',
        variables,
      )
    },
    appConfig(
      variables?: AppConfigQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AppConfigQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AppConfigQuery>(AppConfigDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'appConfig',
        'query',
        variables,
      )
    },
    adminFindManyIdentity(
      variables: AdminFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyIdentityQuery>(AdminFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyIdentity',
        'query',
        variables,
      )
    },
    adminCreateIdentity(
      variables: AdminCreateIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIdentityMutation>(AdminCreateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIdentity',
        'mutation',
        variables,
      )
    },
    adminDeleteIdentity(
      variables: AdminDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIdentityMutation>(AdminDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIdentity',
        'mutation',
        variables,
      )
    },
    userFindManyIdentity(
      variables: UserFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyIdentityQuery>(UserFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyIdentity',
        'query',
        variables,
      )
    },
    userDeleteIdentity(
      variables: UserDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteIdentityMutation>(UserDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteIdentity',
        'mutation',
        variables,
      )
    },
    userRequestIdentityChallenge(
      variables: UserRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRequestIdentityChallengeQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRequestIdentityChallengeQuery>(UserRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRequestIdentityChallenge',
        'query',
        variables,
      )
    },
    userVerifyIdentityChallenge(
      variables: UserVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserVerifyIdentityChallengeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserVerifyIdentityChallengeMutation>(UserVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userVerifyIdentityChallenge',
        'mutation',
        variables,
      )
    },
    userLinkIdentity(
      variables: UserLinkIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserLinkIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserLinkIdentityMutation>(UserLinkIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userLinkIdentity',
        'mutation',
        variables,
      )
    },
    anonRequestIdentityChallenge(
      variables: AnonRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonRequestIdentityChallengeQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonRequestIdentityChallengeQuery>(AnonRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonRequestIdentityChallenge',
        'query',
        variables,
      )
    },
    anonFindUserByIdentity(
      variables: AnonFindUserByIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonFindUserByIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonFindUserByIdentityQuery>(AnonFindUserByIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonFindUserByIdentity',
        'query',
        variables,
      )
    },
    anonVerifyIdentityChallenge(
      variables: AnonVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonVerifyIdentityChallengeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonVerifyIdentityChallengeMutation>(AnonVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonVerifyIdentityChallenge',
        'mutation',
        variables,
      )
    },
    userFindManyLog(
      variables: UserFindManyLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyLogQuery>(UserFindManyLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyLog',
        'query',
        variables,
      )
    },
    userFindOneLog(
      variables: UserFindOneLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneLogQuery>(UserFindOneLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneLog',
        'query',
        variables,
      )
    },
    userDeleteLog(
      variables: UserDeleteLogMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteLogMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteLogMutation>(UserDeleteLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteLog',
        'mutation',
        variables,
      )
    },
    adminFindManyLog(
      variables: AdminFindManyLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyLogQuery>(AdminFindManyLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyLog',
        'query',
        variables,
      )
    },
    adminFindOneLog(
      variables: AdminFindOneLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneLogQuery>(AdminFindOneLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneLog',
        'query',
        variables,
      )
    },
    adminDeleteLog(
      variables: AdminDeleteLogMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteLogMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteLogMutation>(AdminDeleteLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteLog',
        'mutation',
        variables,
      )
    },
    adminFindManyNetworkToken(
      variables: AdminFindManyNetworkTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyNetworkTokenQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyNetworkTokenQuery>(AdminFindManyNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyNetworkToken',
        'query',
        variables,
      )
    },
    adminFindOneNetworkToken(
      variables: AdminFindOneNetworkTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneNetworkTokenQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneNetworkTokenQuery>(AdminFindOneNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneNetworkToken',
        'query',
        variables,
      )
    },
    adminCreateNetworkToken(
      variables: AdminCreateNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateNetworkTokenMutation>(AdminCreateNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateNetworkToken',
        'mutation',
        variables,
      )
    },
    adminUpdateNetworkToken(
      variables: AdminUpdateNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkTokenMutation>(AdminUpdateNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateNetworkToken',
        'mutation',
        variables,
      )
    },
    adminUpdateNetworkTokenMetadata(
      variables: AdminUpdateNetworkTokenMetadataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateNetworkTokenMetadataMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkTokenMetadataMutation>(
            AdminUpdateNetworkTokenMetadataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminUpdateNetworkTokenMetadata',
        'mutation',
        variables,
      )
    },
    adminDeleteNetworkToken(
      variables: AdminDeleteNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkTokenMutation>(AdminDeleteNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetworkToken',
        'mutation',
        variables,
      )
    },
    userFindManyNetworkToken(
      variables: UserFindManyNetworkTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyNetworkTokenQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyNetworkTokenQuery>(UserFindManyNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyNetworkToken',
        'query',
        variables,
      )
    },
    adminFindManyNetwork(
      variables: AdminFindManyNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyNetworkQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyNetworkQuery>(AdminFindManyNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyNetwork',
        'query',
        variables,
      )
    },
    adminFindOneNetwork(
      variables: AdminFindOneNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneNetworkQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneNetworkQuery>(AdminFindOneNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneNetwork',
        'query',
        variables,
      )
    },
    adminCreateNetwork(
      variables: AdminCreateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateNetworkMutation>(AdminCreateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateNetwork',
        'mutation',
        variables,
      )
    },
    adminUpdateNetwork(
      variables: AdminUpdateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkMutation>(AdminUpdateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateNetwork',
        'mutation',
        variables,
      )
    },
    adminDeleteNetwork(
      variables: AdminDeleteNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkMutation>(AdminDeleteNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetwork',
        'mutation',
        variables,
      )
    },
    userGetTokenMetadata(
      variables: UserGetTokenMetadataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetTokenMetadataQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetTokenMetadataQuery>(UserGetTokenMetadataDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetTokenMetadata',
        'query',
        variables,
      )
    },
    userGetTokenAccounts(
      variables: UserGetTokenAccountsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetTokenAccountsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetTokenAccountsQuery>(UserGetTokenAccountsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetTokenAccounts',
        'query',
        variables,
      )
    },
    adminFindManyRule(
      variables: AdminFindManyRuleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyRuleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyRuleQuery>(AdminFindManyRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyRule',
        'query',
        variables,
      )
    },
    adminFindOneRule(
      variables: AdminFindOneRuleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneRuleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneRuleQuery>(AdminFindOneRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneRule',
        'query',
        variables,
      )
    },
    adminCreateRule(
      variables: AdminCreateRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateRuleMutation>(AdminCreateRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateRule',
        'mutation',
        variables,
      )
    },
    adminUpdateRule(
      variables: AdminUpdateRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateRuleMutation>(AdminUpdateRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateRule',
        'mutation',
        variables,
      )
    },
    adminDeleteRule(
      variables: AdminDeleteRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteRuleMutation>(AdminDeleteRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteRule',
        'mutation',
        variables,
      )
    },
    userFindManyRule(
      variables: UserFindManyRuleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyRuleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyRuleQuery>(UserFindManyRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyRule',
        'query',
        variables,
      )
    },
    userFindOneRule(
      variables: UserFindOneRuleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneRuleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneRuleQuery>(UserFindOneRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneRule',
        'query',
        variables,
      )
    },
    userCreateRule(
      variables: UserCreateRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateRuleMutation>(UserCreateRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateRule',
        'mutation',
        variables,
      )
    },
    userCreateRuleCondition(
      variables: UserCreateRuleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateRuleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateRuleConditionMutation>(UserCreateRuleConditionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateRuleCondition',
        'mutation',
        variables,
      )
    },
    userCreateRulePermission(
      variables: UserCreateRulePermissionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateRulePermissionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateRulePermissionMutation>(UserCreateRulePermissionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateRulePermission',
        'mutation',
        variables,
      )
    },
    userUpdateRule(
      variables: UserUpdateRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateRuleMutation>(UserUpdateRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateRule',
        'mutation',
        variables,
      )
    },
    userUpdateRuleCondition(
      variables: UserUpdateRuleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateRuleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateRuleConditionMutation>(UserUpdateRuleConditionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateRuleCondition',
        'mutation',
        variables,
      )
    },
    userDeleteRule(
      variables: UserDeleteRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteRuleMutation>(UserDeleteRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteRule',
        'mutation',
        variables,
      )
    },
    userDeleteRuleCondition(
      variables: UserDeleteRuleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteRuleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteRuleConditionMutation>(UserDeleteRuleConditionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteRuleCondition',
        'mutation',
        variables,
      )
    },
    userDeleteRulePermission(
      variables: UserDeleteRulePermissionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteRulePermissionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteRulePermissionMutation>(UserDeleteRulePermissionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteRulePermission',
        'mutation',
        variables,
      )
    },
    userValidateRule(
      variables: UserValidateRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserValidateRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserValidateRuleMutation>(UserValidateRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userValidateRule',
        'mutation',
        variables,
      )
    },
    userValidateRules(
      variables: UserValidateRulesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserValidateRulesMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserValidateRulesMutation>(UserValidateRulesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userValidateRules',
        'mutation',
        variables,
      )
    },
    adminCreateUser(
      variables: AdminCreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateUserMutation>(AdminCreateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateUser',
        'mutation',
        variables,
      )
    },
    adminDeleteUser(
      variables: AdminDeleteUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteUserMutation>(AdminDeleteUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteUser',
        'mutation',
        variables,
      )
    },
    adminFindManyUser(
      variables: AdminFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyUserQuery>(AdminFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyUser',
        'query',
        variables,
      )
    },
    adminFindOneUser(
      variables: AdminFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneUserQuery>(AdminFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneUser',
        'query',
        variables,
      )
    },
    adminUpdateUser(
      variables: AdminUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateUserMutation>(AdminUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateUser',
        'mutation',
        variables,
      )
    },
    userFindManyUser(
      variables: UserFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyUserQuery>(UserFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyUser',
        'query',
        variables,
      )
    },
    userFindOneUser(
      variables: UserFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneUserQuery>(UserFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneUser',
        'query',
        variables,
      )
    },
    userUpdateUser(
      variables: UserUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateUserMutation>(UserUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateUser',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>
}>

type definedNonNullAny = {}

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v))

export const BotStatusSchema = z.nativeEnum(BotStatus)

export const CommunityRoleSchema = z.nativeEnum(CommunityRole)

export const IdentityProviderSchema = z.nativeEnum(IdentityProvider)

export const LogLevelSchema = z.nativeEnum(LogLevel)

export const LogRelatedTypeSchema = z.nativeEnum(LogRelatedType)

export const NetworkClusterSchema = z.nativeEnum(NetworkCluster)

export const NetworkTokenTypeSchema = z.nativeEnum(NetworkTokenType)

export const NetworkTypeSchema = z.nativeEnum(NetworkType)

export const RuleConditionTypeSchema = z.nativeEnum(RuleConditionType)

export const UserRoleSchema = z.nativeEnum(UserRole)

export const UserStatusSchema = z.nativeEnum(UserStatus)

export function AdminCreateBotInputSchema(): z.ZodObject<Properties<AdminCreateBotInput>> {
  return z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    communityId: z.string(),
    token: z.string(),
  })
}

export function AdminCreateCommunityInputSchema(): z.ZodObject<Properties<AdminCreateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    cluster: NetworkClusterSchema,
    description: z.string().nullish(),
    discordUrl: z.string().nullish(),
    githubUrl: z.string().nullish(),
    name: z.string(),
    telegramUrl: z.string().nullish(),
    twitterUrl: z.string().nullish(),
    websiteUrl: z.string().nullish(),
  })
}

export function AdminCreateCommunityMemberInputSchema(): z.ZodObject<Properties<AdminCreateCommunityMemberInput>> {
  return z.object({
    communityId: z.string(),
    role: CommunityRoleSchema,
    userId: z.string(),
  })
}

export function AdminCreateIdentityInputSchema(): z.ZodObject<Properties<AdminCreateIdentityInput>> {
  return z.object({
    ownerId: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function AdminCreateNetworkInputSchema(): z.ZodObject<Properties<AdminCreateNetworkInput>> {
  return z.object({
    cluster: NetworkClusterSchema,
    endpoint: z.string(),
    name: z.string(),
    type: NetworkTypeSchema,
  })
}

export function AdminCreateNetworkTokenInputSchema(): z.ZodObject<Properties<AdminCreateNetworkTokenInput>> {
  return z.object({
    account: z.string(),
    cluster: NetworkClusterSchema,
  })
}

export function AdminCreateRuleInputSchema(): z.ZodObject<Properties<AdminCreateRuleInput>> {
  return z.object({
    communityId: z.string(),
    description: z.string().nullish(),
    name: z.string(),
  })
}

export function AdminCreateUserInputSchema(): z.ZodObject<Properties<AdminCreateUserInput>> {
  return z.object({
    password: z.string().nullish(),
    username: z.string(),
  })
}

export function AdminFindManyBotInputSchema(): z.ZodObject<Properties<AdminFindManyBotInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyCommunityInputSchema(): z.ZodObject<Properties<AdminFindManyCommunityInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyCommunityMemberInputSchema(): z.ZodObject<Properties<AdminFindManyCommunityMemberInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    role: CommunityRoleSchema.nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyIdentityInputSchema(): z.ZodObject<Properties<AdminFindManyIdentityInput>> {
  return z.object({
    ownerId: z.string().nullish(),
    provider: IdentityProviderSchema.nullish(),
  })
}

export function AdminFindManyLogInputSchema(): z.ZodObject<Properties<AdminFindManyLogInput>> {
  return z.object({
    botId: z.string().nullish(),
    communityId: z.string(),
    identityProvider: IdentityProviderSchema.nullish(),
    identityProviderId: z.string().nullish(),
    level: LogLevelSchema.nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    relatedId: z.string().nullish(),
    relatedType: LogRelatedTypeSchema.nullish(),
    ruleId: z.string().nullish(),
    search: z.string().nullish(),
    userId: z.string().nullish(),
  })
}

export function AdminFindManyNetworkInputSchema(): z.ZodObject<Properties<AdminFindManyNetworkInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyNetworkTokenInputSchema(): z.ZodObject<Properties<AdminFindManyNetworkTokenInput>> {
  return z.object({
    cluster: NetworkClusterSchema,
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyRuleInputSchema(): z.ZodObject<Properties<AdminFindManyRuleInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyUserInputSchema(): z.ZodObject<Properties<AdminFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    role: UserRoleSchema.nullish(),
    search: z.string().nullish(),
    status: UserStatusSchema.nullish(),
  })
}

export function AdminUpdateBotInputSchema(): z.ZodObject<Properties<AdminUpdateBotInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    clientId: z.string().nullish(),
    clientSecret: z.string().nullish(),
    communityId: z.string().nullish(),
    name: z.string().nullish(),
    token: z.string().nullish(),
  })
}

export function AdminUpdateCommunityInputSchema(): z.ZodObject<Properties<AdminUpdateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    description: z.string().nullish(),
    discordUrl: z.string().nullish(),
    githubUrl: z.string().nullish(),
    name: z.string().nullish(),
    telegramUrl: z.string().nullish(),
    twitterUrl: z.string().nullish(),
    websiteUrl: z.string().nullish(),
  })
}

export function AdminUpdateCommunityMemberInputSchema(): z.ZodObject<Properties<AdminUpdateCommunityMemberInput>> {
  return z.object({
    role: CommunityRoleSchema,
  })
}

export function AdminUpdateNetworkInputSchema(): z.ZodObject<Properties<AdminUpdateNetworkInput>> {
  return z.object({
    endpoint: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function AdminUpdateNetworkTokenInputSchema(): z.ZodObject<Properties<AdminUpdateNetworkTokenInput>> {
  return z.object({
    name: z.string().nullish(),
  })
}

export function AdminUpdateRuleInputSchema(): z.ZodObject<Properties<AdminUpdateRuleInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function AdminUpdateUserInputSchema(): z.ZodObject<Properties<AdminUpdateUserInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    developer: z.boolean().nullish(),
    name: z.string().nullish(),
    role: UserRoleSchema.nullish(),
    status: UserStatusSchema.nullish(),
    username: z.string().nullish(),
  })
}

export function LinkIdentityInputSchema(): z.ZodObject<Properties<LinkIdentityInput>> {
  return z.object({
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function LoginInputSchema(): z.ZodObject<Properties<LoginInput>> {
  return z.object({
    password: z.string(),
    username: z.string(),
  })
}

export function RegisterInputSchema(): z.ZodObject<Properties<RegisterInput>> {
  return z.object({
    password: z.string(),
    username: z.string(),
  })
}

export function RequestIdentityChallengeInputSchema(): z.ZodObject<Properties<RequestIdentityChallengeInput>> {
  return z.object({
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function UserCreateBotInputSchema(): z.ZodObject<Properties<UserCreateBotInput>> {
  return z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    communityId: z.string(),
    token: z.string(),
  })
}

export function UserCreateCommunityInputSchema(): z.ZodObject<Properties<UserCreateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    cluster: NetworkClusterSchema,
    description: z.string().nullish(),
    discordUrl: z.string().nullish(),
    githubUrl: z.string().nullish(),
    name: z.string(),
    telegramUrl: z.string().nullish(),
    twitterUrl: z.string().nullish(),
    websiteUrl: z.string().nullish(),
  })
}

export function UserCreateCommunityMemberInputSchema(): z.ZodObject<Properties<UserCreateCommunityMemberInput>> {
  return z.object({
    communityId: z.string(),
    role: CommunityRoleSchema,
    userId: z.string(),
  })
}

export function UserCreateRuleConditionInputSchema(): z.ZodObject<Properties<UserCreateRuleConditionInput>> {
  return z.object({
    account: z.string().nullish(),
    amount: z.string().nullish(),
    config: definedNonNullAnySchema.nullish(),
    filters: definedNonNullAnySchema.nullish(),
    ruleId: z.string(),
    tokenId: z.string().nullish(),
    type: RuleConditionTypeSchema,
  })
}

export function UserCreateRuleInputSchema(): z.ZodObject<Properties<UserCreateRuleInput>> {
  return z.object({
    communityId: z.string(),
    description: z.string().nullish(),
    name: z.string(),
  })
}

export function UserCreateRulePermissionInputSchema(): z.ZodObject<Properties<UserCreateRulePermissionInput>> {
  return z.object({
    botId: z.string(),
    roleId: z.string(),
    ruleId: z.string(),
    serverId: z.string(),
  })
}

export function UserFindManyCommunityInputSchema(): z.ZodObject<Properties<UserFindManyCommunityInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManyCommunityMemberInputSchema(): z.ZodObject<Properties<UserFindManyCommunityMemberInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    role: CommunityRoleSchema.nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManyIdentityInputSchema(): z.ZodObject<Properties<UserFindManyIdentityInput>> {
  return z.object({
    username: z.string(),
  })
}

export function UserFindManyLogInputSchema(): z.ZodObject<Properties<UserFindManyLogInput>> {
  return z.object({
    botId: z.string().nullish(),
    communityId: z.string(),
    identityProvider: IdentityProviderSchema.nullish(),
    identityProviderId: z.string().nullish(),
    level: LogLevelSchema.nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    relatedId: z.string().nullish(),
    relatedType: LogRelatedTypeSchema.nullish(),
    ruleId: z.string().nullish(),
    search: z.string().nullish(),
    userId: z.string().nullish(),
  })
}

export function UserFindManyNetworkTokenInputSchema(): z.ZodObject<Properties<UserFindManyNetworkTokenInput>> {
  return z.object({
    cluster: NetworkClusterSchema,
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    type: NetworkTokenTypeSchema.nullish(),
  })
}

export function UserFindManyRuleInputSchema(): z.ZodObject<Properties<UserFindManyRuleInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManyUserInputSchema(): z.ZodObject<Properties<UserFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserUpdateBotInputSchema(): z.ZodObject<Properties<UserUpdateBotInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    clientId: z.string().nullish(),
    clientSecret: z.string().nullish(),
    name: z.string().nullish(),
    token: z.string().nullish(),
  })
}

export function UserUpdateCommunityInputSchema(): z.ZodObject<Properties<UserUpdateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    description: z.string().nullish(),
    discordUrl: z.string().nullish(),
    githubUrl: z.string().nullish(),
    name: z.string().nullish(),
    telegramUrl: z.string().nullish(),
    twitterUrl: z.string().nullish(),
    websiteUrl: z.string().nullish(),
  })
}

export function UserUpdateCommunityMemberInputSchema(): z.ZodObject<Properties<UserUpdateCommunityMemberInput>> {
  return z.object({
    role: CommunityRoleSchema,
  })
}

export function UserUpdateRuleConditionInputSchema(): z.ZodObject<Properties<UserUpdateRuleConditionInput>> {
  return z.object({
    account: z.string().nullish(),
    amount: z.string().nullish(),
    config: definedNonNullAnySchema.nullish(),
    filters: definedNonNullAnySchema.nullish(),
    tokenId: z.string().nullish(),
  })
}

export function UserUpdateRuleInputSchema(): z.ZodObject<Properties<UserUpdateRuleInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function UserUpdateUserInputSchema(): z.ZodObject<Properties<UserUpdateUserInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    developer: z.boolean().nullish(),
    name: z.string().nullish(),
  })
}

export function VerifyIdentityChallengeInputSchema(): z.ZodObject<Properties<VerifyIdentityChallengeInput>> {
  return z.object({
    challenge: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
    signature: z.string(),
    useLedger: z.boolean().nullish(),
  })
}
