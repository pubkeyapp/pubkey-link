import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'

import { createMockPrismaSchema } from '../../lib/prisma/create-mock-prisma-schema'
import { getPrismaModels } from '../../lib/prisma/get-prisma-models'
import { getPrismaSchemaFile } from '../../lib/prisma/get-prisma-schema-file'
import { normalizePrismaModelSchema } from '../../lib/prisma/normalize-prisma-model-schema'

import { prismaModelGenerator } from './prisma-model-generator'
import { PrismaModelGeneratorSchema } from './prisma-model-schema'

describe('prisma-model generator', () => {
  let tree: Tree
  const options: PrismaModelGeneratorSchema = { name: 'test' }
  const normalizedOptions = normalizePrismaModelSchema(options)

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
    createMockPrismaSchema(tree)
  })

  it('should add a model to the schema', async () => {
    const modelsBefore = getPrismaModels(tree)
    await prismaModelGenerator(tree, options)

    const modelsAfter = getPrismaModels(tree)

    expect(modelsBefore.length).toBe(2)
    expect(modelsAfter.length).toBe(3)
    expect(modelsAfter.find((m) => m.name === normalizedOptions.name)).toBeTruthy()
  })

  it('should add a model to the schema with additional fields', async () => {
    await prismaModelGenerator(tree, {
      name: 'post',
      label: 'Title',
      fields: ['views:Int', 'content'],
    })

    expect(getPrismaSchemaFile(tree)).toMatchInlineSnapshot(`
      "
      generator client {
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

      model Post {
        id        String   @id @default(cuid())
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        owner     User     @relation(fields(), references(), onDelete())
        ownerId   String
        title     String
        views     Int
        content    String
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
      }
      "
    `)
  })

  it('should not create a model if it already exists', async () => {
    const options: PrismaModelGeneratorSchema = { name: 'User' }
    expect.assertions(1)

    try {
      await prismaModelGenerator(tree, options)
    } catch (error) {
      expect(error.message).toBe(`Model "${options.name}" already exists`)
    }
  })
})
