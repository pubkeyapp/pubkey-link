import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class ApiAnonJwtGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      return null as unknown as TUser
    }
    return user
  }
}
