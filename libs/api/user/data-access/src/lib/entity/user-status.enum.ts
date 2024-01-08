import { registerEnumType } from '@nestjs/graphql'
import { UserStatus } from '@prisma/client'
export { UserStatus }

registerEnumType(UserStatus, { name: 'UserStatus' })
