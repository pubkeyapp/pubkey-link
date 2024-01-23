import { registerEnumType } from '@nestjs/graphql'
import { CommunityRole } from '@prisma/client'
export { CommunityRole }

registerEnumType(CommunityRole, { name: 'CommunityRole' })
