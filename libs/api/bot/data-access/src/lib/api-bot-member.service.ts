import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'

@Injectable()
export class ApiBotMemberService {
  private readonly logger = new Logger(ApiBotMemberService.name)

  constructor(private readonly core: ApiCoreService) {}
}
