import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    id: 'beeman.dev',
    username: 'beeman.dev',
    name: 'beeman',
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491?v=4',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        //
        { provider: IdentityProvider.Discord, providerId: '386584531353862154', name: 'beeman.dev' },
        ...[
          { providerId: '3XN71ShwyPNYZ22fV4phQCnyPj6E6EbMLAD5ReLRvdRP', name: 'BEEMAN#8333' },
          { providerId: '9VyTdXMBXXPaEcCXjhCqicLF975Ji2zz4SwMSvCYe9ks', name: 'SAGA' },
          { providerId: 'BEEMANPx2jdmfR7jpn1hRdMuM2Vj4E3azBLb6RUBrCDY', name: 'BEEMAN.DEV' },
          { providerId: 'BeEMuaaQCQPodQdaA7W6Rmsu7761vCabN4Tth6jA4VCP', name: '🌶️ WALLET' },
          { providerId: 'BumrJWH5kf4MXZ5bEg7VyZY6oXAMr78jXC1mFiDAE3u3', name: 'Backpack' },
          { providerId: 'CdrFwyi78fjEN3WFUc72KUxewFdxv1SUSaKAMVkPHQyd', name: 'Dialect' },
          { providerId: 'Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7', name: 'Phantom' },
        ].map(({ providerId, name }) => ({ name, provider: IdentityProvider.Solana, providerId, verified: true })),
      ],
    },
  },
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        {
          provider: IdentityProvider.Solana,
          providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG',
          name: 'ALiC98..ZH3BRG',
        },
      ],
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
