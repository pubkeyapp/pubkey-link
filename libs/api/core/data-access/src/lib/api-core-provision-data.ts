import { faker } from '@faker-js/faker'
import {
  CommunityRole,
  IdentityProvider,
  NetworkCluster,
  NetworkTokenType,
  Prisma,
  UserRole,
  UserStatus,
} from '@prisma/client'

const cluster = NetworkCluster.SolanaMainnet
const DL_SERVER = '953959331353751632'
const DL_ROLE_ONE_OF_US = '1126756485200871465'
const DL_ROLE_BV = '1148950083941961798'
const DL_ROLE_BV_EXPIRED = '1150017837017084005'
const DL_ROLE_HOLDER = '1205617205006434384'

export const provisionCommunities: Prisma.CommunityCreateInput[] = [
  {
    cluster,
    name: 'PubKey',
    description: 'Decentralized identities on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    bot: {
      create: {
        clientId: process.env['PUBKEY_BOT_CLIENT_ID'] ?? '',
        clientSecret: process.env['PUBKEY_BOT_CLIENT_SECRET'] ?? '',
        token: process.env['PUBKEY_BOT_TOKEN'] ?? '',
        avatarUrl:
          'https://cdn.discordapp.com/avatars/1151220382444044298/2b0c80a7bb6ec8970d4953c5621b7d43.png?size=1024',
        id: process.env['PUBKEY_BOT_CLIENT_ID'] ?? '',
        name: 'PubKey Linked Roles',
        status: 'Active',
        permissions: {
          create: [],
        },
      },
    },
    members: {
      create: [
        { user: { connect: { id: 'beeman' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'alice' } }, role: CommunityRole.Member },
      ],
    },
    roles: {
      create: [
        {
          id: 'role-one-of-us',
          name: 'One of Us',
          // permissions: {
          //   create: [
          //     { id: 'perm-one-of-us', botId: '953959331353751632-1163196496607457441' }
          //   ],
          // },
          conditions: {
            create: [
              {
                id: 'cond-deanslist-nft-holder',
                type: NetworkTokenType.NonFungible,
                name: 'Deanslist NFT holder',
                token: {
                  connect: {
                    account_cluster: { cluster, account: '5FusHaKEKjfKsmQwXNrhFcFABGGxu7iYCdbvyVSRe3Ri' },
                  },
                },
                amount: '1',
              },
            ],
          },
        },
        { name: 'Mad Lads' },
        { name: 'Mc Degens DAO' },
        { name: 'The Faceless' },
      ],
    },
  },
  {
    cluster,
    name: "Dean's List DAO",
    description: 'A DAO turned Network State',
    avatarUrl: 'https://avatars.githubusercontent.com/u/137821488?v=4',
    bot: {
      create: {
        clientId: process.env['DEANSLIST_BOT_CLIENT_ID'] ?? '',
        clientSecret: process.env['DEANSLIST_BOT_CLIENT_SECRET'] ?? '',
        token: process.env['DEANSLIST_BOT_TOKEN'] ?? '',
        avatarUrl:
          'https://cdn.discordapp.com/avatars/1138462172092039258/2d9f621e44433c97e171bb40ec122b6f.png?size=1024',
        id: process.env['DEANSLIST_BOT_CLIENT_ID'] ?? '',
        name: "Dean's List Projects LOCAL",
        permissions: {
          create: [DL_ROLE_ONE_OF_US, DL_ROLE_BV, DL_ROLE_BV_EXPIRED, DL_ROLE_HOLDER].map((serverRoleId) => ({
            id: `${DL_SERVER}-${serverRoleId}`,
            serverId: DL_SERVER,
            serverRoleId,
          })),
        },
      },
    },
    roles: {
      create: [
        {
          id: 'one-of-us',
          name: 'One of Us',
          conditions: {
            create: [
              {
                type: NetworkTokenType.NonFungible,
                name: 'Deanslist NFT holder',
                token: {
                  connect: {
                    account_cluster: { cluster, account: '5FusHaKEKjfKsmQwXNrhFcFABGGxu7iYCdbvyVSRe3Ri' },
                  },
                },
                amount: '1',
              },
            ],
          },
          permissions: { create: [{ botId: `${DL_SERVER}-${DL_ROLE_ONE_OF_US}` }] },
        },
        {
          id: 'business-visa',
          name: 'Business Visa',
          conditions: {
            create: [
              {
                type: NetworkTokenType.NonFungible,
                name: 'Business Visa NFT holder',
                token: {
                  connect: { account_cluster: { cluster, account: '9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp' } },
                },
                amount: '1',
                filters: { status: 'active' },
              },
            ],
          },
          permissions: { create: [{ botId: `${DL_SERVER}-${DL_ROLE_BV}` }] },
        },
        {
          id: 'business-visa-expired',
          name: 'Business Visa (Expired)',
          conditions: {
            create: [
              {
                type: NetworkTokenType.NonFungible,
                name: 'Business Visa NFT holder (Expired)',
                token: {
                  connect: { account_cluster: { cluster, account: '9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp' } },
                },
                amount: '1',
                filters: { status: 'expired' },
              },
            ],
          },
          permissions: { create: [{ botId: `${DL_SERVER}-${DL_ROLE_BV_EXPIRED}` }] },
        },
        {
          id: 'dean-holder',
          name: 'DEAN Holder',
          conditions: {
            create: [
              {
                type: NetworkTokenType.Fungible,
                name: '$DEAN token holder',
                amount: '100',
                token: {
                  connect: { account_cluster: { cluster, account: 'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a' } },
                },
              },
            ],
          },
          permissions: { create: [{ botId: `${DL_SERVER}-${DL_ROLE_HOLDER}` }] },
        },
      ],
    },
    members: {
      create: [
        { user: { connect: { id: 'beeman' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'alice' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'bob' } }, role: CommunityRole.Member },
      ],
    },
  },
  {
    cluster,
    name: 'Marinade',
    description: 'A DAO with a staking protocol built on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/81361338?v=4',
    members: {
      create: [
        { user: { connect: { id: 'beeman' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'bob' } }, role: CommunityRole.Member },
      ],
    },
    roles: {
      create: [{ name: 'MNDE Holders' }, { name: 'MNDE Holders (Shark)' }, { name: 'MNDE Holders (Whale)' }],
    },
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
        { provider: IdentityProvider.Discord, providerId: '386584531353862154' },
        { provider: IdentityProvider.GitHub, providerId: '36491' },
        ...[
          '3XN71ShwyPNYZ22fV4phQCnyPj6E6EbMLAD5ReLRvdRP',
          '9VyTdXMBXXPaEcCXjhCqicLF975Ji2zz4SwMSvCYe9ks',
          'BeEMuaaQCQPodQdaA7W6Rmsu7761vCabN4Tth6jA4VCP',
          'BumrJWH5kf4MXZ5bEg7VyZY6oXAMr78jXC1mFiDAE3u3',
          'CdrFwyi78fjEN3WFUc72KUxewFdxv1SUSaKAMVkPHQyd',
          'Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7',
        ].map((providerId) => ({ provider: IdentityProvider.Solana, providerId, verified: true })),
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
