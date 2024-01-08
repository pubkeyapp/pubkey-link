import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  ApiAnonJwtGuard,
  ApiAuthRequest,
  ApiAuthService,
  ApiAuthStrategyGithubGuard,
} from '@pubkey-link/api-auth-data-access'
import { Response } from 'express-serve-static-core'

@Controller('auth/github')
export class ApiAuthStrategyGithubController {
  constructor(private readonly service: ApiAuthService) {}

  @Get()
  @UseGuards(ApiAuthStrategyGithubGuard)
  redirect() {
    // This method triggers the OAuth2 flow
  }

  @Get('callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthStrategyGithubGuard)
  async callback(@Req() req: ApiAuthRequest, @Res({ passthrough: true }) res: Response) {
    return this.service.userCookieRedirect(req, res)
  }
}
