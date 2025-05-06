import { registerEnumType } from '@nestjs/graphql'
import { ResolverType } from '@prisma/client'

export { ResolverType }

registerEnumType(ResolverType, { name: 'ResolverType' })
