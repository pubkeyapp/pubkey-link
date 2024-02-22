import { registerEnumType } from '@nestjs/graphql'
import { NetworkType } from '@prisma/client'
export { NetworkType }

registerEnumType(NetworkType, { name: 'NetworkType' })
