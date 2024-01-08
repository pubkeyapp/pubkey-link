import { createPrismaSchemaBuilder, getSchema, printSchema } from '@mrleebo/prisma-ast'
import { Tree } from '@nx/devkit'

const baseScheme = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Email {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  default   Boolean  @default(false)
  email     String   @unique
  owner     User     @relation(fields: [ownerId], references: [id])
  ownerId   String
}

model User {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  avatarUrl String?
  developer Boolean  @default(false)
  name      String?
  password  String?
  role      UserRole @default(User)
  username  String   @unique
  emails    Email[]
}

enum UserRole {
  Admin
  User
}`

export function createMockPrismaSchema(tree: Tree) {
  tree.write('prisma/schema.prisma', baseScheme)

  const schema = getSchema(baseScheme)
  const sorted = printSchema(schema, { sort: true })

  if (sorted.trim() !== baseScheme.trim()) {
    console.log(sorted)
    throw new Error('createMockPrismaSchema: Prisma baseScheme not properly sorted')
  }
}

export function addPrismaModel(schema: string, name: string, label: string) {
  const builder = createPrismaSchemaBuilder(schema)

  builder
    .model(name)
    .field('id', 'String')
    .attribute('id')
    .attribute('default', [{ name: 'cuid' }])
    .field('createdAt', 'DateTime')
    .attribute('default', [{ name: 'now' }])
    .field('updatedAt', 'DateTime')
    .attribute('updatedAt')
    .field(label, 'String')

  return builder.print({ sort: true })
}
