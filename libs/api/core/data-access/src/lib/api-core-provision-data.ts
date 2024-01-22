import { faker } from '@faker-js/faker'
import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionUsers: Prisma.UserCreateInput[] = [
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
