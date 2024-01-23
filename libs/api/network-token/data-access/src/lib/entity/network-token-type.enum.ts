import { registerEnumType } from '@nestjs/graphql'
import { NetworkTokenType } from '@prisma/client'
export { NetworkTokenType }

registerEnumType(NetworkTokenType, { name: 'NetworkTokenType' })