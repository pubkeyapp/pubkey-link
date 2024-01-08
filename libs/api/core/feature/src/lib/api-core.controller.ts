import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class ApiCoreController {
  constructor(private readonly service: ApiCoreService) {}

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }
}
