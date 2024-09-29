import { Module } from '@nestjs/common'
import { ApiCoreConfigModule } from '../config/api-core-config.module'
import { ApiCoreProtocolService } from './api-core-protocol.service'

@Module({
  imports: [ApiCoreConfigModule],
  providers: [ApiCoreProtocolService],
  exports: [ApiCoreProtocolService],
})
export class ApiCoreProtocolModule {}
