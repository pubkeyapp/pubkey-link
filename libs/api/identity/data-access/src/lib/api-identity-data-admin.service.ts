import { Injectable } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateIdentityInput } from './dto/admin-create-identity.input'
import { AdminFindManyIdentityInput } from './dto/admin-find-many-identity.input'

@Injectable()
export class ApiIdentityDataAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async createIdentity(input: AdminCreateIdentityInput): Promise<PrismaIdentity> {
    const found = await this.core.data.identity.findUnique({
      where: { provider_providerId: { providerId: input.providerId, provider: input.provider } },
    })
    if (found) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} already exists`)
    }
    if (input.provider === IdentityProvider.Discord) {
      throw new Error(`Cannot create Discord identity`)
    }
    const created = await this.core.data.identity.create({
      data: {
        name: input.providerId,
        ownerId: input.ownerId,
        providerId: input.providerId,
        provider: input.provider,
      },
    })
    if (!created) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} not created`)
    }
    return created
  }

  async deleteIdentity(identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findUnique({ where: { id: identityId } })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(input: AdminFindManyIdentityInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: {
        ownerId: input.ownerId ? input.ownerId : undefined,
        provider: input.provider ? input.provider : undefined,
      },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
      include: {
        challenges: { orderBy: { createdAt: 'desc' } },
        owner: !input.ownerId,
      },
    })
    return items ?? []
  }
}
