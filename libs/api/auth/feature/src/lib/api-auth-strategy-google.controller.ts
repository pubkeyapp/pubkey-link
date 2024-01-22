import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  ApiAnonJwtGuard,
  ApiAuthRequest,
  ApiAuthService,
  ApiAuthStrategyGoogleGuard,
} from '@pubkey-link/api-auth-data-access'
import { Response } from 'express-serve-static-core'

@Controller('auth/google')
export class ApiAuthStrategyGoogleController {
  constructor(private readonly service: ApiAuthService) {}

  @Get()
  @UseGuards(ApiAuthStrategyGoogleGuard)
  redirect() {
    // This method triggers the OAuth2 flow
  }

  @Get('callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthStrategyGoogleGuard)
  async callback(@Req() req: ApiAuthRequest, @Res({ passthrough: true }) res: Response) {
    return this.service.userCookieRedirect(req, res)
  }
}
