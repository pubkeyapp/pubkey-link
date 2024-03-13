import { Injectable } from '@nestjs/common'
import { CommunityRole, Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { TeamPaging } from './entity/team.entity'

@Injectable()
export class ApiTeamDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.TeamUncheckedCreateInput) {
    return this.core.data.team.create({ data: input })
  }

  async delete(teamId: string) {
    const deleted = await this.core.data.team.delete({ where: { id: teamId } })
    return !!deleted
  }

  async findMany({ limit = 10, page = 1, ...input }: Prisma.TeamFindManyArgs & PagingInputFields): Promise<TeamPaging> {
    return this.core.data.team
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(teamId: string, userId?: string) {
    const where: Prisma.TeamWhereUniqueInput = { id: teamId }
    if (userId) {
      where.OR = [
        { identity: { ownerId: userId } },
        { members: { some: { userId } } },
        { community: { members: { some: { userId, role: CommunityRole.Admin } } } },
      ]
    }
    return this.core.data.team.findUnique({
      where,
      include: { members: { include: { user: true } }, identity: { include: { owner: true } } },
    })
  }

  async update(teamId: string, input: Prisma.TeamUpdateInput) {
    return this.core.data.team.update({ where: { id: teamId }, data: input })
  }
}
