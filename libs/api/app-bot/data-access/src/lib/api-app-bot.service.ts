import { Injectable } from '@nestjs/common'
import { ApiAdminAppBotService } from './api-admin-app-bot.service'

@Injectable()
export class ApiAppBotService {
  constructor(readonly admin: ApiAdminAppBotService) {}
}
