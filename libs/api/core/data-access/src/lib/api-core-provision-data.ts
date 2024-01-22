import { faker } from '@faker-js/faker'
import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionCommunities: Prisma.CommunityCreateInput[] = [
  {
    id: 'pubkey',
    name: 'PubKey',
    description: 'Decentralized identities on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    // members: {
    //   create: [
    //     { user: { connect: { id: 'beeman' } }, role: AppMemberRole.Admin },
    //     { user: { connect: { id: 'alice' } }, role: AppMemberRole.Member },
    //   ],
    // },
    // rules: {
    //   create: [
    //     //
    //     { name: 'Mad Lads' },
    //     { name: 'Mc Degens DAO' },
    //     { name: 'The Faceless' },
    //   ],
    // },
  },
  {
    id: 'deanslist',
    name: "Dean's List DAO",
    description: 'A DAO turned Network State',
    avatarUrl: 'https://avatars.githubusercontent.com/u/137821488?v=4',
    // rules: {
    //   create: [
    //     // // no prettier formatting here please
    //     // prettier-ignore
    //     { name: 'NFT Holders', conditions: { create: [{ type: 'CollectionAsset', value: '5FusHaKEKjfKsmQwXNrhFcFABGGxu7iYCdbvyVSRe3Ri', amount: '1', name: 'Deanslist' }] } },
    //     {
    //       name: 'Business Visa',
    //       conditions: {
    //         create: [
    //           {
    //             type: 'CollectionAsset',
    //             value: '9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp',
    //             amount: '1',
    //             name: "Dean's List Business Visa",
    //           },
    //         ],
    //       },
    //     },
    //     { name: 'Business Visa (Expired)' },
    //     { name: 'DEAN Holder' },
    //     { name: 'DEAN Holder (Shark)' },
    //     { name: 'DEAN Holder (Whale)' },
    //   ],
    // },
    // members: {
    //   create: [
    //     { user: { connect: { id: 'beeman' } }, role: AppMemberRole.Admin },
    //     { user: { connect: { id: 'alice' } }, role: AppMemberRole.Admin },
    //     { user: { connect: { id: 'bob' } }, role: AppMemberRole.Member },
    //   ],
    // },
  },
  {
    id: 'marinade',
    name: 'Marinade',
    description: 'A DAO with a staking protocol built on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/81361338?v=4',
    // members: {
    //   create: [
    //     { user: { connect: { id: 'beeman' } }, role: AppMemberRole.Admin },
    //     { user: { connect: { id: 'bob' } }, role: AppMemberRole.Member },
    //   ],
    // },
    // rules: {
    //   create: [ { name: 'MNDE Holders' }, { name: 'MNDE Holders (Shark)' }, { name: 'MNDE Holders (Whale)' }, ],
    // },
  },
]
export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    id: 'beeman',
    username: 'beeman',
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491?v=4',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        //
        { provider: IdentityProvider.GitHub, providerId: '36491' },
      ],
    },
  },
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
]

export function fakeUsers(count: number): Prisma.UserCreateInput[] {
  return Array.from({ length: count }, (_, index) => fakeUser(index))
}

export function fakeUser(index: number): Prisma.UserCreateInput {
  faker.seed(index)
  const username = faker.internet.userName()
  const password = faker.internet.password()
  const avatarUrl = faker.internet.avatar()
  const name = faker.internet.displayName()

  return {
    avatarUrl,
    name,
    password,
    role: UserRole.User,
    status: UserStatus.Active,
    username,
  }
}
