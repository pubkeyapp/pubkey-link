import { Injectable, Logger, Res } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UserStatus } from '@prisma/client'
import {
  ApiCoreService,
  AppContext,
  hashPassword,
  slugifyId,
  validatePassword,
} from '@pubkey-link/api-core-data-access'
import { Response } from 'express-serve-static-core'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'
import { ApiAuthRequest } from './interfaces/api-auth.request'

@Injectable()
export class ApiAuthService {
  private readonly logger = new Logger(ApiAuthService.name)
  constructor(readonly core: ApiCoreService, private readonly jwt: JwtService) {}

  async login(context: AppContext, input: LoginInput) {
    if (!this.core.config.authPasswordEnabled) {
      throw new Error(`Login with username and password is not allowed.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const user = await this.validateUser(input)
    this.signAndSetCookie(context, { username: user.username, id: user.id })

    return user
  }

  logout(context: AppContext) {
    this.resetCookie(context)
    return Promise.resolve(true)
  }

  async register(context: AppContext, input: RegisterInput) {
    if (!this.core.config.authRegisterEnabled) {
      throw new Error(`Registration is disabled.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const username = slugifyId(input.username)
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (exists) {
      throw new Error('User already exists.')
    }
    const user = await this.core.data.user.create({
      data: {
        username,
        password: hashPassword(input.password),
        status: UserStatus.Created,
      },
    })

    this.signAndSetCookie(context, { username: user.username, id: user.id })

    return user
  }

  private async validateUser({ username, password }: LoginInput) {
    const user = await this.core.data.user.findUnique({ where: { username } })
    if (!user) {
      throw new Error('User not found.')
    }
    if (!user.password) {
      throw new Error('Password login not allowed.')
    }
    if (user.status === UserStatus.Inactive) {
      throw new Error('User is inactive.')
    }
    if (!validatePassword(password, user.password)) {
      throw new Error('Password is incorrect.')
    }
    user.password = null
    return user
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
