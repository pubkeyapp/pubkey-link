import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ApiCoreConfigService } from './api-core-config.service'
import { configuration } from './configuration'
import { validationSchema } from './validation-schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [ApiCoreConfigService],
  exports: [ApiCoreConfigService],
})
export class ApiCoreConfigModule {}
