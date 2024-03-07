import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionUsers: Prisma.UserCreateInput[] = [
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
          verified: true,
        },
      ],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
    identities: {
      create: [
        {
          provider: IdentityProvider.Solana,
          providerId: 'BoBigKFEgt5izFVmpZAqnHDjNXNMYFbYrbiXy4EkfJDE',
          name: 'BoBigK..EkfJDE',
          verified: true,
        },
      ],
    },
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
