import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  ApiAnonJwtGuard,
  ApiAuthRequest,
  ApiAuthService,
  ApiAuthStrategyTwitterGuard,
} from '@pubkey-link/api-auth-data-access'
import { Response } from 'express-serve-static-core'

@Controller('auth/twitter')
export class ApiAuthStrategyTwitterController {
  constructor(private readonly service: ApiAuthService) {}

  @Get()
  @UseGuards(ApiAuthStrategyTwitterGuard)
  redirect() {
    // This method triggers the OAuth2 flow
  }

  @Get('callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthStrategyTwitterGuard)
  async callback(@Req() req: ApiAuthRequest, @Res({ passthrough: true }) res: Response) {
    return this.service.userCookieRedirect(req, res)
  }
}
