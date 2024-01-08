import { Controller, Get, Req, UseGuards } from '@nestjs/common'

import { ApiAnonJwtGuard, ApiAuthRequest, ApiAuthService } from '@pubkey-link/api-auth-data-access'

@Controller('auth')
export class ApiAuthController {
  constructor(private readonly service: ApiAuthService) {}

  @Get('me')
  @UseGuards(ApiAnonJwtGuard)
  async getMe(@Req() req: ApiAuthRequest) {
    return req.user ?? 'anon'
  }
}
