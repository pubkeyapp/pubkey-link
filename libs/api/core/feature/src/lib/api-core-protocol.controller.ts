import { Controller, Get, Param } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { PubKeyIdentityProvider } from '@pubkey-program-library/anchor'

@Controller()
export class ApiCoreProtocolController {
  constructor(private readonly service: ApiCoreService) {}

  @Get('pointers')
  pointers() {
    return this.service.protocol.getPointers()
  }

  @Get('profiles')
  profiles() {
    return this.service.protocol.getProfiles()
  }

  @Get('providers')
  providers() {
    return this.service.protocol.getProviders()
  }

  @Get('provider/:provider/:providerId')
  profileByProvider(@Param('provider') provider: PubKeyIdentityProvider, @Param('providerId') providerId: string) {
    return this.service.protocol.getProfileByProvider({ providerId, provider })
  }

  @Get('username/:username')
  profileByUsername(@Param('username') username: string) {
    return this.service.protocol.getProfileByUsername({ username })
  }
}
