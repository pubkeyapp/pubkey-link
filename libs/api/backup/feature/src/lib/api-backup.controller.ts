import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ApiBackupService } from '@pubkey-link/api-backup-data-access'

@Controller('backup')
export class ApiBackupController {
  constructor(private readonly service: ApiBackupService) {}

  @Get('download')
  async downloadBackup(@Query('name') name: string, @Query('secret') secret: string) {
    if (!name || !secret) {
      throw new BadRequestException('Missing name or secret')
    }
    return this.service.downloadBackup(name, secret)
  }
}
