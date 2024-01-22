import { createPrismaSchemaBuilder, getSchema, printSchema } from '@mrleebo/prisma-ast'
import { Tree } from '@nx/devkit'
import { type ParsedPrismaModelField, parsePrismaModelFields } from './parse-prisma-model-fields'

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
    throw new Error('createMockPrismaSchema: Prisma baseScheme not properly sorted')
  }
}

export function addPrismaModel(schema: string, name: string, label: string, fields: string[]) {
  const builder = createPrismaSchemaBuilder(schema).model(name)

  const parsedFields = parsePrismaModelFields(fields)

  const defaultFields: ParsedPrismaModelField[] = [
    {
      name: 'id',
      type: 'String',
      attributes: [{ name: 'id' }, { name: 'default', params: [{ name: 'cuid' }] }],
    },
    {
      name: 'createdAt',
      type: 'DateTime',
      attributes: [{ name: 'default', params: [{ name: 'now' }] }],
    },
    {
      name: 'updatedAt',
      type: 'DateTime',
      attributes: [{ name: 'updatedAt' }],
    },

    //   owner        User                @relation(fields: [ownerId], references: [id], onDelete: Cascade)
    //   ownerId      String
    {
      name: 'owner',
      type: 'User',
      attributes: [
        {
          name: 'relation',
          params: [
            { name: 'fields', params: ['ownerId'] },
            { name: 'references', params: ['id'] },
            { name: 'onDelete', params: ['Cascade'] },
          ],
        },
      ],
    },
    { name: 'ownerId', type: 'String' },

    { name: label, type: 'String' },
  ]

  for (const { name, type, attributes = [], isOptional } of [...defaultFields, ...parsedFields]) {
    const field = builder.field(name, isOptional ? type + '?' : type)
    for (const { name, params } of attributes) {
      field.attribute(name, params)
    }
  }

  return builder.print({ sort: true })
}
