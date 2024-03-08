import { Injectable, Logger, Res } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { ApiCoreService, AppContext } from '@pubkey-link/api-core-data-access'
import { Response } from 'express-serve-static-core'

import { ApiAuthRequest } from './interfaces/api-auth.request'

@Injectable()
export class ApiAuthService {
  private readonly logger = new Logger(ApiAuthService.name)
  constructor(readonly core: ApiCoreService, private readonly jwt: JwtService) {}

  logout(context: AppContext) {
    this.resetCookie(context)
    return Promise.resolve(true)
  }

  signAndSetCookie(context: AppContext, { id, username }: { username: string; id: string }) {
    const token = this.sign({ id, username })
    this.setCookie(context, token)
    return token
  }

  private resetCookie(context: AppContext) {
    return context.res.clearCookie(this.core.config.cookieName, this.core.config.cookieOptions(context.req.hostname))
  }

  private setCookie(context: AppContext, token: string) {
    return context.res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(context.req.hostname))
  }

  async setUserCookie(context: AppContext) {
    if (!context.req.user) {
      throw new Error('No user found.')
    }
    const { username, id } = context.req.user as User
    const token = this.signAndSetCookie(context, { username, id })
    return context.res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(context.req.hostname))
  }

  async userCookieRedirect(req: ApiAuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.setUserCookie({ req, res, user: req.user })
    return res.redirect(this.core.config.webUrl + '/dashboard')
  }

  private sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload)
  }
}
