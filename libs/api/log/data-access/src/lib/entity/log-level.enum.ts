import { registerEnumType } from '@nestjs/graphql'
import { LogLevel } from '@prisma/client'
export { LogLevel }

registerEnumType(LogLevel, { name: 'LogLevel' })
