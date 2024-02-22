import { registerEnumType } from '@nestjs/graphql'
import { BotStatus } from '@prisma/client'
export { BotStatus }

registerEnumType(BotStatus, { name: 'BotStatus' })
