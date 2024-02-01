import { registerEnumType } from '@nestjs/graphql'
import { LogRelatedType } from '@prisma/client'
export { LogRelatedType }

registerEnumType(LogRelatedType, { name: 'LogRelatedType' })