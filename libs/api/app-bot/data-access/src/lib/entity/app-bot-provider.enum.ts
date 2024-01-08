import { registerEnumType } from '@nestjs/graphql'
import { AppBotProvider } from '@prisma/client'
export { AppBotProvider }

registerEnumType(AppBotProvider, { name: 'AppBotProvider' })
