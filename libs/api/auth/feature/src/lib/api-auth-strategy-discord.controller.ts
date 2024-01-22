import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  ApiAnonJwtGuard,
  ApiAuthRequest,
  ApiAuthService,
  ApiAuthStrategyDiscordGuard,
} from '@pubkey-link/api-auth-data-access'
import { Response } from 'express-serve-static-core'

@Controller('auth/discord')
export class ApiAuthStrategyDiscordController {
  constructor(private readonly service: ApiAuthService) {}

  @Get()
  @UseGuards(ApiAuthStrategyDiscordGuard)
  redirect() {
    // This method triggers the OAuth2 flow
  }

  @Get('callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthStrategyDiscordGuard)
  async callback(@Req() req: ApiAuthRequest, @Res({ passthrough: true }) res: Response) {
    return this.service.userCookieRedirect(req, res)
  }
}
