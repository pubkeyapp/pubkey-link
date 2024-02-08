import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserFindManyUserInput } from './dto/user-find-many-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserPaging } from './entity/user-paging.entity'
import { getUserUserWhereInput } from './helpers/get-user-user-where.input'

@Injectable()
export class ApiUserUserService {
  private readonly logger = new Logger(ApiUserUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async findManyUser(input: UserFindManyUserInput): Promise<UserPaging> {
    return this.core.data.user
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserUserWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async updateUser(userId: string, input: UserUpdateUserInput) {
    return this.core.data.user.update({ where: { id: userId }, data: input })
  }

  async findOneUser(username: string) {
    const found = await this.core.data.user.findUnique({ where: { username } })

    if (!found) {
      throw new Error(`User ${username} not found`)
    }
    return found
  }

  async findOneUserId(userId: string) {
    const found = await this.core.data.user.findUnique({ where: { id: userId } })

    if (!found) {
      throw new Error(`User with id ${userId} not found`)
    }
    return found
  }
}
