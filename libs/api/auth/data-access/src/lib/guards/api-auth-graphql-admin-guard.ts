import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { UserRole } from '@prisma/client'

@Injectable()
export class ApiAuthGraphQLAdminGuard extends AuthGuard('jwt') {
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

    if (req.user?.role !== UserRole.Admin) {
      throw new ForbiddenException(`Unauthorized: User is not Admin`)
    }

    return true
  }
}
