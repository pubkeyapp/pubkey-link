import { registerEnumType } from '@nestjs/graphql'
import { NetworkCluster } from '@prisma/client'
export { NetworkCluster }

registerEnumType(NetworkCluster, { name: 'NetworkCluster' })
