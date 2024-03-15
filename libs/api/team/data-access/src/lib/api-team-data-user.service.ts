import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiTeamDataService } from './api-team-data.service'
import { UserCreateTeamInput } from './dto/user-create-team.input'
import { UserFindManyTeamInput } from './dto/user-find-many-team.input'
import { UserUpdateTeamInput } from './dto/user-update-team.input'
import { TeamPaging } from './entity/team.entity'
import { getTeamWhereUserInput } from './helpers/get-team-where-user.input'

@Injectable()
export class ApiTeamDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiTeamDataService) {}

  async createTeam(ownerId: string, input: UserCreateTeamInput) {
    await this.core.ensureCommunityAccess({ communityId: input.communityId, userId: ownerId })
    const identity = await this.core.data.identity.findFirst({
      where: { id: input.identityId },
      include: { teams: true },
    })
    if (!identity) {
      throw new Error('Identity not found')
    }
    if (identity.ownerId !== ownerId) {
      throw new Error('You do not own this identity')
    }
    if (identity.provider !== IdentityProvider.Solana) {
      throw new Error('Identity must be a Solana identity')
    }
    if (identity.teams.find((t) => t.communityId === input.communityId)) {
      throw new Error('Identity is already linked to a team in this community')
    }

    return this.data.create({
      ...input,
      members: { connect: { communityId_userId: { userId: ownerId, communityId: input.communityId } } },
    })
  }

  async deleteTeam(ownerId: string, teamId: string) {
    const team = await this.ensureTeamOwner({ ownerId, teamId })
    await this.core.ensureCommunityAccess({ communityId: team.communityId, userId: ownerId })
    return this.data.delete(teamId)
  }

  async findManyTeam(userId: string, input: UserFindManyTeamInput): Promise<TeamPaging> {
    await this.core.ensureCommunityAccess({ communityId: input.communityId, userId })
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getTeamWhereUserInput(userId, input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneTeam(userId: string, teamId: string) {
    const team = await this.data.findOne(teamId, userId)
    if (!team) {
      throw new Error('Team not found')
    }
    await this.core.ensureCommunityAccess({ communityId: team.communityId, userId })
    return team
  }

  async updateTeam(ownerId: string, teamId: string, input: UserUpdateTeamInput) {
    const team = await this.ensureTeamOwner({ ownerId, teamId })
    await this.core.ensureCommunityAccess({ communityId: team.communityId, userId: ownerId })
    return this.data.update(teamId, input)
  }

  async addTeamMember(ownerId: string, teamId: string, userId: string) {
    const team = await this.ensureTeamOwner({ ownerId, teamId })
    const found = team.members.find((m) => m.userId === userId)
    if (found) {
      throw new Error('User is already a member of this team')
    }
    const communityMember = await this.core.ensureCommunityAccess({ userId, communityId: team.communityId })
    if (!communityMember) {
      throw new Error(`User ${userId} is not a member of community ${team.communityId}`)
    }

    const updated = await this.data.update(teamId, {
      members: { connect: { communityId_userId: { userId, communityId: team.communityId } } },
    })
    return !!updated
  }

  async removeTeamMember(ownerId: string, teamId: string, userId: string) {
    const team = await this.ensureTeamOwner({ ownerId, teamId })
    const found = team.members.find((m) => m.userId === userId)
    if (!found) {
      throw new Error('User is not a member of this team')
    }
    const updated = await this.data.update(teamId, {
      members: { disconnect: { communityId_userId: { userId, communityId: team.communityId } } },
    })
    return !!updated
  }

  private async ensureTeamOwner({ ownerId, teamId }: { ownerId: string; teamId: string }) {
    const team = await this.data.findOne(teamId)
    if (team?.identity.ownerId !== ownerId) {
      throw new Error('You are not the owner of this team')
    }
    return team
  }
}
