import { Injectable } from '@nestjs/common'
import { ApiTeamDataService } from './api-team-data.service'
import { AdminFindManyTeamInput } from './dto/admin-find-many-team.input'
import { AdminUpdateTeamInput } from './dto/admin-update-team.input'
import { TeamPaging } from './entity/team.entity'
import { getTeamWhereAdminInput } from './helpers/get-team-where-admin.input'

@Injectable()
export class ApiTeamDataAdminService {
  constructor(private readonly data: ApiTeamDataService) {}

  async deleteTeam(teamId: string) {
    return this.data.delete(teamId)
  }

  async findManyTeam(input: AdminFindManyTeamInput): Promise<TeamPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getTeamWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneTeam(teamId: string) {
    return this.data.findOne(teamId)
  }

  async updateTeam(teamId: string, input: AdminUpdateTeamInput) {
    return this.data.update(teamId, input)
  }
}
