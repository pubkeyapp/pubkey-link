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
  authDiscordEnabled: Scalars['Boolean']['output']
  authGithubEnabled: Scalars['Boolean']['output']
  authGoogleEnabled: Scalars['Boolean']['output']
  authPasswordEnabled: Scalars['Boolean']['output']
  authRegisterEnabled: Scalars['Boolean']['output']
  authSolanaEnabled: Scalars['Boolean']['output']
  authTwitterEnabled: Scalars['Boolean']['output']
}

export type Community = {
  __typename?: 'Community'
  avatarUrl?: Maybe<Scalars['String']['output']>
  cluster?: Maybe<NetworkCluster>
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

export type Identity = {
  __typename?: 'Identity'
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt: Scalars['DateTime']['output']
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']['output']>
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
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

export type LoginInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminCreateCommunity?: Maybe<Community>
  adminCreateCommunityMember?: Maybe<CommunityMember>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateNetwork?: Maybe<Network>
  adminCreateNetworkToken?: Maybe<NetworkToken>
  adminCreateRule?: Maybe<Rule>
  adminCreateUser?: Maybe<User>
  adminDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunityMember?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetwork?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetworkToken?: Maybe<Scalars['Boolean']['output']>
  adminDeleteRule?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminUpdateCommunity?: Maybe<Community>
  adminUpdateCommunityMember?: Maybe<CommunityMember>
  adminUpdateNetwork?: Maybe<Network>
  adminUpdateNetworkToken?: Maybe<NetworkToken>
  adminUpdateRule?: Maybe<Rule>
  adminUpdateUser?: Maybe<User>
  anonVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  register?: Maybe<User>
  userCreateCommunity?: Maybe<Community>
  userCreateCommunityMember?: Maybe<CommunityMember>
  userCreateRule?: Maybe<Rule>
  userDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  userDeleteCommunityMember?: Maybe<Scalars['Boolean']['output']>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userDeleteRule?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userTestRule?: Maybe<Scalars['JSON']['output']>
  userUpdateCommunity?: Maybe<Community>
  userUpdateCommunityMember?: Maybe<CommunityMember>
  userUpdateRule?: Maybe<Rule>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
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

export type MutationAdminDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationAdminDeleteCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
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

export type MutationUserCreateCommunityArgs = {
  input: UserCreateCommunityInput
}

export type MutationUserCreateCommunityMemberArgs = {
  input: UserCreateCommunityMemberInput
}

export type MutationUserCreateRuleArgs = {
  input: UserCreateRuleInput
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

export type MutationUserDeleteRuleArgs = {
  ruleId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserTestRuleArgs = {
  address: Scalars['String']['input']
  ruleId: Scalars['String']['input']
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

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
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
  adminFindManyCommunity: CommunityPaging
  adminFindManyCommunityMember: CommunityMemberPaging
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyNetwork: NetworkPaging
  adminFindManyNetworkToken: NetworkTokenPaging
  adminFindManyRule: RulePaging
  adminFindManyUser: UserPaging
  adminFindOneCommunity?: Maybe<Community>
  adminFindOneCommunityMember?: Maybe<CommunityMember>
  adminFindOneNetwork?: Maybe<Network>
  adminFindOneNetworkToken?: Maybe<NetworkToken>
  adminFindOneRule?: Maybe<Rule>
  adminFindOneUser?: Maybe<User>
  anonRequestIdentityChallenge?: Maybe<IdentityChallenge>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyCommunity: CommunityPaging
  userFindManyCommunityMember: CommunityMemberPaging
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyRule: RulePaging
  userFindManyUser: UserPaging
  userFindOneCommunity?: Maybe<Community>
  userFindOneCommunityMember?: Maybe<CommunityMember>
  userFindOneRule?: Maybe<Rule>
  userFindOneUser?: Maybe<User>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
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

export type QueryAdminFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryAdminFindOneCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
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

export type QueryUserFindManyRuleArgs = {
  input: UserFindManyRuleInput
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
}

export type QueryUserFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserFindOneCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type QueryUserFindOneRuleArgs = {
  ruleId: Scalars['String']['input']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
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
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type RuleCondition = {
  __typename?: 'RuleCondition'
  account: Scalars['String']['output']
  amount?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  filters?: Maybe<Scalars['JSON']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  type?: Maybe<RuleConditionType>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export enum RuleConditionType {
  AnybodiesNftAssets = 'AnybodiesNftAssets',
  SolanaNftAssets = 'SolanaNftAssets',
  SolanaTokenAmount = 'SolanaTokenAmount',
}

export type RulePaging = {
  __typename?: 'RulePaging'
  data: Array<Rule>
  meta: PagingMeta
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

export type UserCreateRuleInput = {
  communityId: Scalars['String']['input']
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
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
  } | null
}

export type UserDeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserDeleteCommunityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  authDiscordEnabled: boolean
  authGithubEnabled: boolean
  authGoogleEnabled: boolean
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
  authSolanaEnabled: boolean
  authTwitterEnabled: boolean
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
    authDiscordEnabled: boolean
    authGithubEnabled: boolean
    authGoogleEnabled: boolean
    authPasswordEnabled: boolean
    authRegisterEnabled: boolean
    authSolanaEnabled: boolean
    authTwitterEnabled: boolean
  }
}

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  createdAt: Date
  expired?: boolean | null
  id: string
  name?: string | null
  profile?: any | null
  provider: IdentityProvider
  providerId: string
  updatedAt: Date
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
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
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
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
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
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
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
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
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

export type AdminDeleteNetworkTokenMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminDeleteNetworkTokenMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

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

export type RuleDetailsFragment = {
  __typename?: 'Rule'
  createdAt?: Date | null
  id: string
  communityId: string
  name: string
  description?: string | null
  updatedAt?: Date | null
  conditions?: Array<{
    __typename?: 'RuleCondition'
    createdAt?: Date | null
    id: string
    name: string
    type?: RuleConditionType | null
    account: string
    amount?: string | null
    filters?: any | null
    updatedAt?: Date | null
  }> | null
}

export type RuleConditionDetailsFragment = {
  __typename?: 'RuleCondition'
  createdAt?: Date | null
  id: string
  name: string
  type?: RuleConditionType | null
  account: string
  amount?: string | null
  filters?: any | null
  updatedAt?: Date | null
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
      conditions?: Array<{
        __typename?: 'RuleCondition'
        createdAt?: Date | null
        id: string
        name: string
        type?: RuleConditionType | null
        account: string
        amount?: string | null
        filters?: any | null
        updatedAt?: Date | null
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
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      name: string
      type?: RuleConditionType | null
      account: string
      amount?: string | null
      filters?: any | null
      updatedAt?: Date | null
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
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      name: string
      type?: RuleConditionType | null
      account: string
      amount?: string | null
      filters?: any | null
      updatedAt?: Date | null
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
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      name: string
      type?: RuleConditionType | null
      account: string
      amount?: string | null
      filters?: any | null
      updatedAt?: Date | null
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
      conditions?: Array<{
        __typename?: 'RuleCondition'
        createdAt?: Date | null
        id: string
        name: string
        type?: RuleConditionType | null
        account: string
        amount?: string | null
        filters?: any | null
        updatedAt?: Date | null
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
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      name: string
      type?: RuleConditionType | null
      account: string
      amount?: string | null
      filters?: any | null
      updatedAt?: Date | null
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
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      name: string
      type?: RuleConditionType | null
      account: string
      amount?: string | null
      filters?: any | null
      updatedAt?: Date | null
    }> | null
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
    conditions?: Array<{
      __typename?: 'RuleCondition'
      createdAt?: Date | null
      id: string
      name: string
      type?: RuleConditionType | null
      account: string
      amount?: string | null
      filters?: any | null
      updatedAt?: Date | null
    }> | null
  } | null
}

export type UserDeleteRuleMutationVariables = Exact<{
  ruleId: Scalars['String']['input']
}>

export type UserDeleteRuleMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserTestRuleMutationVariables = Exact<{
  ruleId: Scalars['String']['input']
  address: Scalars['String']['input']
}>

export type UserTestRuleMutation = { __typename?: 'Mutation'; result?: any | null }

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
        createdAt: Date
        expired?: boolean | null
        id: string
        name?: string | null
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt: Date
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
  }
`
export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    authDiscordEnabled
    authGithubEnabled
    authGoogleEnabled
    authPasswordEnabled
    authRegisterEnabled
    authSolanaEnabled
    authTwitterEnabled
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
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
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
export const RuleConditionDetailsFragmentDoc = gql`
  fragment RuleConditionDetails on RuleCondition {
    createdAt
    id
    name
    type
    account
    amount
    filters
    updatedAt
  }
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
    updatedAt
  }
  ${RuleConditionDetailsFragmentDoc}
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
export const AnonVerifyIdentityChallengeDocument = gql`
  mutation anonVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: anonVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
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
export const AdminDeleteNetworkTokenDocument = gql`
  mutation adminDeleteNetworkToken($networkTokenId: String!) {
    deleted: adminDeleteNetworkToken(networkTokenId: $networkTokenId)
  }
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
export const UserUpdateRuleDocument = gql`
  mutation userUpdateRule($ruleId: String!, $input: UserUpdateRuleInput!) {
    updated: userUpdateRule(ruleId: $ruleId, input: $input) {
      ...RuleDetails
    }
  }
  ${RuleDetailsFragmentDoc}
`
export const UserDeleteRuleDocument = gql`
  mutation userDeleteRule($ruleId: String!) {
    deleted: userDeleteRule(ruleId: $ruleId)
  }
`
export const UserTestRuleDocument = gql`
  mutation userTestRule($ruleId: String!, $address: String!) {
    result: userTestRule(ruleId: $ruleId, address: $address)
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
const AnonVerifyIdentityChallengeDocumentString = print(AnonVerifyIdentityChallengeDocument)
const AdminFindManyNetworkTokenDocumentString = print(AdminFindManyNetworkTokenDocument)
const AdminFindOneNetworkTokenDocumentString = print(AdminFindOneNetworkTokenDocument)
const AdminCreateNetworkTokenDocumentString = print(AdminCreateNetworkTokenDocument)
const AdminUpdateNetworkTokenDocumentString = print(AdminUpdateNetworkTokenDocument)
const AdminDeleteNetworkTokenDocumentString = print(AdminDeleteNetworkTokenDocument)
const AdminFindManyNetworkDocumentString = print(AdminFindManyNetworkDocument)
const AdminFindOneNetworkDocumentString = print(AdminFindOneNetworkDocument)
const AdminCreateNetworkDocumentString = print(AdminCreateNetworkDocument)
const AdminUpdateNetworkDocumentString = print(AdminUpdateNetworkDocument)
const AdminDeleteNetworkDocumentString = print(AdminDeleteNetworkDocument)
const AdminFindManyRuleDocumentString = print(AdminFindManyRuleDocument)
const AdminFindOneRuleDocumentString = print(AdminFindOneRuleDocument)
const AdminCreateRuleDocumentString = print(AdminCreateRuleDocument)
const AdminUpdateRuleDocumentString = print(AdminUpdateRuleDocument)
const AdminDeleteRuleDocumentString = print(AdminDeleteRuleDocument)
const UserFindManyRuleDocumentString = print(UserFindManyRuleDocument)
const UserFindOneRuleDocumentString = print(UserFindOneRuleDocument)
const UserCreateRuleDocumentString = print(UserCreateRuleDocument)
const UserUpdateRuleDocumentString = print(UserUpdateRuleDocument)
const UserDeleteRuleDocumentString = print(UserDeleteRuleDocument)
const UserTestRuleDocumentString = print(UserTestRuleDocument)
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
    userTestRule(
      variables: UserTestRuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserTestRuleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserTestRuleMutation>(UserTestRuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userTestRule',
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

export const CommunityRoleSchema = z.nativeEnum(CommunityRole)

export const IdentityProviderSchema = z.nativeEnum(IdentityProvider)

export const NetworkClusterSchema = z.nativeEnum(NetworkCluster)

export const NetworkTokenTypeSchema = z.nativeEnum(NetworkTokenType)

export const NetworkTypeSchema = z.nativeEnum(NetworkType)

export const RuleConditionTypeSchema = z.nativeEnum(RuleConditionType)

export const UserRoleSchema = z.nativeEnum(UserRole)

export const UserStatusSchema = z.nativeEnum(UserStatus)

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

export function UserCreateRuleInputSchema(): z.ZodObject<Properties<UserCreateRuleInput>> {
  return z.object({
    communityId: z.string(),
    description: z.string().nullish(),
    name: z.string(),
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
