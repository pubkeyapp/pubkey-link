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

export type AdminCreateAppBotInput = {
  appId: Scalars['String']['input']
  clientId: Scalars['String']['input']
  clientSecret: Scalars['String']['input']
  name: Scalars['String']['input']
  provider: AppBotProvider
  token: Scalars['String']['input']
}

export type AdminCreateAppInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type AdminCreateAppUserInput = {
  appId: Scalars['String']['input']
  role: AppUserRole
  userId: Scalars['String']['input']
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type AdminCreateUserInput = {
  password?: InputMaybe<Scalars['String']['input']>
  username: Scalars['String']['input']
}

export type AdminFindManyAppBotInput = {
  appId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyAppInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyAppUserInput = {
  appId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<AppUserRole>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatus>
}

export type AdminUpdateAppBotInput = {
  clientId?: InputMaybe<Scalars['String']['input']>
  clientSecret?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<AppBotStatus>
  token?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateAppInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateAppUserInput = {
  appId: Scalars['String']['input']
  role: AppUserRole
  userId: Scalars['String']['input']
}

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']['input']>
}

export type App = {
  __typename?: 'App'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AppBot = {
  __typename?: 'AppBot'
  appId: Scalars['String']['output']
  avatarUrl?: Maybe<Scalars['String']['output']>
  clientId?: Maybe<Scalars['String']['output']>
  clientSecret?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  provider: AppBotProvider
  status: AppBotStatus
  token?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AppBotPaging = {
  __typename?: 'AppBotPaging'
  data: Array<AppBot>
  meta: PagingMeta
}

export enum AppBotProvider {
  Discord = 'Discord',
}

export enum AppBotStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export type AppConfig = {
  __typename?: 'AppConfig'
  authDiscordEnabled: Scalars['Boolean']['output']
  authGithubEnabled: Scalars['Boolean']['output']
  authPasswordEnabled: Scalars['Boolean']['output']
  authRegisterEnabled: Scalars['Boolean']['output']
  authSolanaEnabled: Scalars['Boolean']['output']
  authTwitterEnabled: Scalars['Boolean']['output']
}

export type AppPaging = {
  __typename?: 'AppPaging'
  data: Array<App>
  meta: PagingMeta
}

export type AppUser = {
  __typename?: 'AppUser'
  appId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  role: AppUserRole
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  userId: Scalars['String']['output']
}

export type AppUserPaging = {
  __typename?: 'AppUserPaging'
  data: Array<AppUser>
  meta: PagingMeta
}

export enum AppUserRole {
  Admin = 'Admin',
  User = 'User',
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
  adminCreateApp?: Maybe<App>
  adminCreateAppBot?: Maybe<AppBot>
  adminCreateAppUser?: Maybe<AppUser>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateUser?: Maybe<User>
  adminDeleteApp?: Maybe<Scalars['Boolean']['output']>
  adminDeleteAppBot?: Maybe<Scalars['Boolean']['output']>
  adminDeleteAppUser?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminUpdateApp?: Maybe<App>
  adminUpdateAppBot?: Maybe<AppBot>
  adminUpdateAppUser?: Maybe<AppUser>
  adminUpdateUser?: Maybe<User>
  anonVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  register?: Maybe<User>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminCreateAppArgs = {
  input: AdminCreateAppInput
}

export type MutationAdminCreateAppBotArgs = {
  input: AdminCreateAppBotInput
}

export type MutationAdminCreateAppUserArgs = {
  input: AdminCreateAppUserInput
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteAppArgs = {
  appId: Scalars['String']['input']
}

export type MutationAdminDeleteAppBotArgs = {
  appBotId: Scalars['String']['input']
}

export type MutationAdminDeleteAppUserArgs = {
  appUserId: Scalars['String']['input']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationAdminUpdateAppArgs = {
  appId: Scalars['String']['input']
  input: AdminUpdateAppInput
}

export type MutationAdminUpdateAppBotArgs = {
  appBotId: Scalars['String']['input']
  input: AdminUpdateAppBotInput
}

export type MutationAdminUpdateAppUserArgs = {
  appUserId: Scalars['String']['input']
  input: AdminUpdateAppUserInput
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

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
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
  adminFindManyApp: AppPaging
  adminFindManyAppBot: AppBotPaging
  adminFindManyAppUser: AppUserPaging
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyUser: UserPaging
  adminFindOneApp?: Maybe<App>
  adminFindOneAppBot?: Maybe<AppBot>
  adminFindOneAppUser?: Maybe<AppUser>
  adminFindOneUser?: Maybe<User>
  anonRequestIdentityChallenge?: Maybe<IdentityChallenge>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyUser: UserPaging
  userFindOneUser?: Maybe<User>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
}

export type QueryAdminFindManyAppArgs = {
  input: AdminFindManyAppInput
}

export type QueryAdminFindManyAppBotArgs = {
  input: AdminFindManyAppBotInput
}

export type QueryAdminFindManyAppUserArgs = {
  input: AdminFindManyAppUserInput
}

export type QueryAdminFindManyIdentityArgs = {
  input: AdminFindManyIdentityInput
}

export type QueryAdminFindManyUserArgs = {
  input: AdminFindManyUserInput
}

export type QueryAdminFindOneAppArgs = {
  appId: Scalars['String']['input']
}

export type QueryAdminFindOneAppBotArgs = {
  appBotId: Scalars['String']['input']
}

export type QueryAdminFindOneAppUserArgs = {
  appUserId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryAnonRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
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

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developer?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  identities?: Maybe<Array<Identity>>
  name?: Maybe<Scalars['String']['output']>
  profileUrl?: Maybe<Scalars['String']['output']>
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
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

export type AppBotDetailsFragment = {
  __typename?: 'AppBot'
  id: string
  createdAt?: Date | null
  updatedAt?: Date | null
  name: string
  avatarUrl?: string | null
  provider: AppBotProvider
  status: AppBotStatus
  token?: string | null
  clientId?: string | null
  clientSecret?: string | null
  appId: string
}

export type AdminFindManyAppBotQueryVariables = Exact<{
  input: AdminFindManyAppBotInput
}>

export type AdminFindManyAppBotQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'AppBotPaging'
    data: Array<{
      __typename?: 'AppBot'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      name: string
      avatarUrl?: string | null
      provider: AppBotProvider
      status: AppBotStatus
      token?: string | null
      clientId?: string | null
      clientSecret?: string | null
      appId: string
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

export type AdminFindOneAppBotQueryVariables = Exact<{
  appBotId: Scalars['String']['input']
}>

export type AdminFindOneAppBotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppBot'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    name: string
    avatarUrl?: string | null
    provider: AppBotProvider
    status: AppBotStatus
    token?: string | null
    clientId?: string | null
    clientSecret?: string | null
    appId: string
  } | null
}

export type AdminCreateAppBotMutationVariables = Exact<{
  input: AdminCreateAppBotInput
}>

export type AdminCreateAppBotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'AppBot'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    name: string
    avatarUrl?: string | null
    provider: AppBotProvider
    status: AppBotStatus
    token?: string | null
    clientId?: string | null
    clientSecret?: string | null
    appId: string
  } | null
}

export type AdminUpdateAppBotMutationVariables = Exact<{
  appBotId: Scalars['String']['input']
  input: AdminUpdateAppBotInput
}>

export type AdminUpdateAppBotMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'AppBot'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    name: string
    avatarUrl?: string | null
    provider: AppBotProvider
    status: AppBotStatus
    token?: string | null
    clientId?: string | null
    clientSecret?: string | null
    appId: string
  } | null
}

export type AdminDeleteAppBotMutationVariables = Exact<{
  appBotId: Scalars['String']['input']
}>

export type AdminDeleteAppBotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AppUserDetailsFragment = {
  __typename?: 'AppUser'
  appId: string
  createdAt?: Date | null
  id: string
  role: AppUserRole
  userId: string
  updatedAt?: Date | null
}

export type AdminFindManyAppUserQueryVariables = Exact<{
  input: AdminFindManyAppUserInput
}>

export type AdminFindManyAppUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'AppUserPaging'
    data: Array<{
      __typename?: 'AppUser'
      appId: string
      createdAt?: Date | null
      id: string
      role: AppUserRole
      userId: string
      updatedAt?: Date | null
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        profileUrl?: string | null
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

export type AdminFindOneAppUserQueryVariables = Exact<{
  appUserId: Scalars['String']['input']
}>

export type AdminFindOneAppUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppUser'
    appId: string
    createdAt?: Date | null
    id: string
    role: AppUserRole
    userId: string
    updatedAt?: Date | null
  } | null
}

export type AdminCreateAppUserMutationVariables = Exact<{
  input: AdminCreateAppUserInput
}>

export type AdminCreateAppUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'AppUser'
    appId: string
    createdAt?: Date | null
    id: string
    role: AppUserRole
    userId: string
    updatedAt?: Date | null
  } | null
}

export type AdminUpdateAppUserMutationVariables = Exact<{
  appUserId: Scalars['String']['input']
  input: AdminUpdateAppUserInput
}>

export type AdminUpdateAppUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'AppUser'
    appId: string
    createdAt?: Date | null
    id: string
    role: AppUserRole
    userId: string
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteAppUserMutationVariables = Exact<{
  appUserId: Scalars['String']['input']
}>

export type AdminDeleteAppUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AppDetailsFragment = {
  __typename?: 'App'
  createdAt?: Date | null
  id: string
  name: string
  avatarUrl?: string | null
  updatedAt?: Date | null
}

export type AdminFindManyAppQueryVariables = Exact<{
  input: AdminFindManyAppInput
}>

export type AdminFindManyAppQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'AppPaging'
    data: Array<{
      __typename?: 'App'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
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

export type AdminFindOneAppQueryVariables = Exact<{
  appId: Scalars['String']['input']
}>

export type AdminFindOneAppQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'App'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    updatedAt?: Date | null
  } | null
}

export type AdminCreateAppMutationVariables = Exact<{
  input: AdminCreateAppInput
}>

export type AdminCreateAppMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'App'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    updatedAt?: Date | null
  } | null
}

export type AdminUpdateAppMutationVariables = Exact<{
  appId: Scalars['String']['input']
  input: AdminUpdateAppInput
}>

export type AdminUpdateAppMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'App'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteAppMutationVariables = Exact<{
  appId: Scalars['String']['input']
}>

export type AdminDeleteAppMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

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
    profileUrl?: string | null
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
    profileUrl?: string | null
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
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  authDiscordEnabled: boolean
  authGithubEnabled: boolean
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
      profileUrl?: string | null
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

export type UserFindManyIdentityQueryVariables = Exact<{ [key: string]: never }>

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

export type UserDetailsFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  id: string
  name?: string | null
  profileUrl?: string | null
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
    profileUrl?: string | null
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
      profileUrl?: string | null
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
    profileUrl?: string | null
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
    profileUrl?: string | null
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
      profileUrl?: string | null
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
    profileUrl?: string | null
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
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export const AppBotDetailsFragmentDoc = gql`
  fragment AppBotDetails on AppBot {
    id
    createdAt
    updatedAt
    name
    avatarUrl
    provider
    status
    token
    clientId
    clientSecret
    appId
  }
`
export const AppUserDetailsFragmentDoc = gql`
  fragment AppUserDetails on AppUser {
    appId
    createdAt
    id
    role
    userId
    updatedAt
  }
`
export const AppDetailsFragmentDoc = gql`
  fragment AppDetails on App {
    createdAt
    id
    name
    avatarUrl
    updatedAt
  }
`
export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    authDiscordEnabled
    authGithubEnabled
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
export const AdminFindManyAppBotDocument = gql`
  query adminFindManyAppBot($input: AdminFindManyAppBotInput!) {
    paging: adminFindManyAppBot(input: $input) {
      data {
        ...AppBotDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${AppBotDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneAppBotDocument = gql`
  query adminFindOneAppBot($appBotId: String!) {
    item: adminFindOneAppBot(appBotId: $appBotId) {
      ...AppBotDetails
    }
  }
  ${AppBotDetailsFragmentDoc}
`
export const AdminCreateAppBotDocument = gql`
  mutation adminCreateAppBot($input: AdminCreateAppBotInput!) {
    created: adminCreateAppBot(input: $input) {
      ...AppBotDetails
    }
  }
  ${AppBotDetailsFragmentDoc}
`
export const AdminUpdateAppBotDocument = gql`
  mutation adminUpdateAppBot($appBotId: String!, $input: AdminUpdateAppBotInput!) {
    updated: adminUpdateAppBot(appBotId: $appBotId, input: $input) {
      ...AppBotDetails
    }
  }
  ${AppBotDetailsFragmentDoc}
`
export const AdminDeleteAppBotDocument = gql`
  mutation adminDeleteAppBot($appBotId: String!) {
    deleted: adminDeleteAppBot(appBotId: $appBotId)
  }
`
export const AdminFindManyAppUserDocument = gql`
  query adminFindManyAppUser($input: AdminFindManyAppUserInput!) {
    paging: adminFindManyAppUser(input: $input) {
      data {
        ...AppUserDetails
        user {
          ...UserDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${AppUserDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneAppUserDocument = gql`
  query adminFindOneAppUser($appUserId: String!) {
    item: adminFindOneAppUser(appUserId: $appUserId) {
      ...AppUserDetails
    }
  }
  ${AppUserDetailsFragmentDoc}
`
export const AdminCreateAppUserDocument = gql`
  mutation adminCreateAppUser($input: AdminCreateAppUserInput!) {
    created: adminCreateAppUser(input: $input) {
      ...AppUserDetails
    }
  }
  ${AppUserDetailsFragmentDoc}
`
export const AdminUpdateAppUserDocument = gql`
  mutation adminUpdateAppUser($appUserId: String!, $input: AdminUpdateAppUserInput!) {
    updated: adminUpdateAppUser(appUserId: $appUserId, input: $input) {
      ...AppUserDetails
    }
  }
  ${AppUserDetailsFragmentDoc}
`
export const AdminDeleteAppUserDocument = gql`
  mutation adminDeleteAppUser($appUserId: String!) {
    deleted: adminDeleteAppUser(appUserId: $appUserId)
  }
`
export const AdminFindManyAppDocument = gql`
  query adminFindManyApp($input: AdminFindManyAppInput!) {
    paging: adminFindManyApp(input: $input) {
      data {
        ...AppDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneAppDocument = gql`
  query adminFindOneApp($appId: String!) {
    item: adminFindOneApp(appId: $appId) {
      ...AppDetails
    }
  }
  ${AppDetailsFragmentDoc}
`
export const AdminCreateAppDocument = gql`
  mutation adminCreateApp($input: AdminCreateAppInput!) {
    created: adminCreateApp(input: $input) {
      ...AppDetails
    }
  }
  ${AppDetailsFragmentDoc}
`
export const AdminUpdateAppDocument = gql`
  mutation adminUpdateApp($appId: String!, $input: AdminUpdateAppInput!) {
    updated: adminUpdateApp(appId: $appId, input: $input) {
      ...AppDetails
    }
  }
  ${AppDetailsFragmentDoc}
`
export const AdminDeleteAppDocument = gql`
  mutation adminDeleteApp($appId: String!) {
    deleted: adminDeleteApp(appId: $appId)
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
  query userFindManyIdentity {
    items: userFindManyIdentity {
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
const AdminFindManyAppBotDocumentString = print(AdminFindManyAppBotDocument)
const AdminFindOneAppBotDocumentString = print(AdminFindOneAppBotDocument)
const AdminCreateAppBotDocumentString = print(AdminCreateAppBotDocument)
const AdminUpdateAppBotDocumentString = print(AdminUpdateAppBotDocument)
const AdminDeleteAppBotDocumentString = print(AdminDeleteAppBotDocument)
const AdminFindManyAppUserDocumentString = print(AdminFindManyAppUserDocument)
const AdminFindOneAppUserDocumentString = print(AdminFindOneAppUserDocument)
const AdminCreateAppUserDocumentString = print(AdminCreateAppUserDocument)
const AdminUpdateAppUserDocumentString = print(AdminUpdateAppUserDocument)
const AdminDeleteAppUserDocumentString = print(AdminDeleteAppUserDocument)
const AdminFindManyAppDocumentString = print(AdminFindManyAppDocument)
const AdminFindOneAppDocumentString = print(AdminFindOneAppDocument)
const AdminCreateAppDocumentString = print(AdminCreateAppDocument)
const AdminUpdateAppDocumentString = print(AdminUpdateAppDocument)
const AdminDeleteAppDocumentString = print(AdminDeleteAppDocument)
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
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
    adminFindManyAppBot(
      variables: AdminFindManyAppBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyAppBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyAppBotQuery>(AdminFindManyAppBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyAppBot',
        'query',
        variables,
      )
    },
    adminFindOneAppBot(
      variables: AdminFindOneAppBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneAppBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneAppBotQuery>(AdminFindOneAppBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneAppBot',
        'query',
        variables,
      )
    },
    adminCreateAppBot(
      variables: AdminCreateAppBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateAppBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateAppBotMutation>(AdminCreateAppBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateAppBot',
        'mutation',
        variables,
      )
    },
    adminUpdateAppBot(
      variables: AdminUpdateAppBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateAppBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateAppBotMutation>(AdminUpdateAppBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateAppBot',
        'mutation',
        variables,
      )
    },
    adminDeleteAppBot(
      variables: AdminDeleteAppBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteAppBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteAppBotMutation>(AdminDeleteAppBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteAppBot',
        'mutation',
        variables,
      )
    },
    adminFindManyAppUser(
      variables: AdminFindManyAppUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyAppUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyAppUserQuery>(AdminFindManyAppUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyAppUser',
        'query',
        variables,
      )
    },
    adminFindOneAppUser(
      variables: AdminFindOneAppUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneAppUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneAppUserQuery>(AdminFindOneAppUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneAppUser',
        'query',
        variables,
      )
    },
    adminCreateAppUser(
      variables: AdminCreateAppUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateAppUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateAppUserMutation>(AdminCreateAppUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateAppUser',
        'mutation',
        variables,
      )
    },
    adminUpdateAppUser(
      variables: AdminUpdateAppUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateAppUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateAppUserMutation>(AdminUpdateAppUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateAppUser',
        'mutation',
        variables,
      )
    },
    adminDeleteAppUser(
      variables: AdminDeleteAppUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteAppUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteAppUserMutation>(AdminDeleteAppUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteAppUser',
        'mutation',
        variables,
      )
    },
    adminFindManyApp(
      variables: AdminFindManyAppQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyAppQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyAppQuery>(AdminFindManyAppDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyApp',
        'query',
        variables,
      )
    },
    adminFindOneApp(
      variables: AdminFindOneAppQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneAppQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneAppQuery>(AdminFindOneAppDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneApp',
        'query',
        variables,
      )
    },
    adminCreateApp(
      variables: AdminCreateAppMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateAppMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateAppMutation>(AdminCreateAppDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateApp',
        'mutation',
        variables,
      )
    },
    adminUpdateApp(
      variables: AdminUpdateAppMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateAppMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateAppMutation>(AdminUpdateAppDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateApp',
        'mutation',
        variables,
      )
    },
    adminDeleteApp(
      variables: AdminDeleteAppMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteAppMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteAppMutation>(AdminDeleteAppDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteApp',
        'mutation',
        variables,
      )
    },
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
      variables?: UserFindManyIdentityQueryVariables,
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

export const AppBotProviderSchema = z.nativeEnum(AppBotProvider)

export const AppBotStatusSchema = z.nativeEnum(AppBotStatus)

export const AppUserRoleSchema = z.nativeEnum(AppUserRole)

export const IdentityProviderSchema = z.nativeEnum(IdentityProvider)

export const UserRoleSchema = z.nativeEnum(UserRole)

export const UserStatusSchema = z.nativeEnum(UserStatus)

export function AdminCreateAppBotInputSchema(): z.ZodObject<Properties<AdminCreateAppBotInput>> {
  return z.object({
    appId: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
    name: z.string(),
    provider: AppBotProviderSchema,
    token: z.string(),
  })
}

export function AdminCreateAppInputSchema(): z.ZodObject<Properties<AdminCreateAppInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    name: z.string(),
  })
}

export function AdminCreateAppUserInputSchema(): z.ZodObject<Properties<AdminCreateAppUserInput>> {
  return z.object({
    appId: z.string(),
    role: AppUserRoleSchema,
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

export function AdminCreateUserInputSchema(): z.ZodObject<Properties<AdminCreateUserInput>> {
  return z.object({
    password: z.string().nullish(),
    username: z.string(),
  })
}

export function AdminFindManyAppBotInputSchema(): z.ZodObject<Properties<AdminFindManyAppBotInput>> {
  return z.object({
    appId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyAppInputSchema(): z.ZodObject<Properties<AdminFindManyAppInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyAppUserInputSchema(): z.ZodObject<Properties<AdminFindManyAppUserInput>> {
  return z.object({
    appId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    role: AppUserRoleSchema.nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyIdentityInputSchema(): z.ZodObject<Properties<AdminFindManyIdentityInput>> {
  return z.object({
    ownerId: z.string().nullish(),
    provider: IdentityProviderSchema.nullish(),
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

export function AdminUpdateAppBotInputSchema(): z.ZodObject<Properties<AdminUpdateAppBotInput>> {
  return z.object({
    clientId: z.string().nullish(),
    clientSecret: z.string().nullish(),
    name: z.string().nullish(),
    status: AppBotStatusSchema.nullish(),
    token: z.string().nullish(),
  })
}

export function AdminUpdateAppInputSchema(): z.ZodObject<Properties<AdminUpdateAppInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function AdminUpdateAppUserInputSchema(): z.ZodObject<Properties<AdminUpdateAppUserInput>> {
  return z.object({
    appId: z.string(),
    role: AppUserRoleSchema,
    userId: z.string(),
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

export function UserFindManyUserInputSchema(): z.ZodObject<Properties<UserFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
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
