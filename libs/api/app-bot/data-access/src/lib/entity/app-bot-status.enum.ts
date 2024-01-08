import { registerEnumType } from '@nestjs/graphql'
import { AppBotStatus } from '@prisma/client'

export { AppBotStatus }

registerEnumType(AppBotStatus, { name: 'AppBotStatus' })
