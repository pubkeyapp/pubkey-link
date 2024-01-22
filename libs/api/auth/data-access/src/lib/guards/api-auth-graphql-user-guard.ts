import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { UserStatus } from '@prisma/client'

@Injectable()
export class ApiAuthGraphQLUserGuard extends AuthGuard('jwt') {
  constructor(private readonly statuses: UserStatus[] = [UserStatus.Active]) {
    super()
  }
  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)

    return ctx.getContext().req
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    if (!req || !req.user) {
      throw new ForbiddenException(`Unauthorized: User is not authenticated`)
    }

    if (!this.statuses.includes(req.user?.status)) {
      throw new Error(`Unauthorized: User is not ${this.statuses.join(' or ')}`)
    }

    return true
  }
}
