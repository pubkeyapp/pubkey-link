import { registerEnumType } from '@nestjs/graphql'
import { IdentityProvider } from '@prisma/client'
export { IdentityProvider }

registerEnumType(IdentityProvider, { name: 'IdentityProvider' })
