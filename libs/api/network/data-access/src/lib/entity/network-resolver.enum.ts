import { registerEnumType } from '@nestjs/graphql'
import { NetworkResolver } from '@prisma/client'
export { NetworkResolver }

registerEnumType(NetworkResolver, { name: 'NetworkResolver' })
