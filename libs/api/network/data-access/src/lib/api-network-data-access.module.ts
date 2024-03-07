import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminNetworkService } from './api-admin-network.service'
import { ApiNetworkClusterService } from './api-network-cluster.service'
import { ApiNetworkService } from './api-network.service'
import { ApiNetworkProvisionService } from './provision/api-network-provision.service'
import { ApiNetworkResolverAnybodiesService } from './resolver/api-network-resolver-anybodies.service'
import { ApiNetworkResolverSolanaFungibleService } from './resolver/api-network-resolver-solana-fungible.service'
import { ApiNetworkResolverSolanaNonFungibleService } from './resolver/api-network-resolver-solana-non-fungible.service'
import { ApiNetworkResolverService } from './resolver/api-network-resolver.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiAdminNetworkService,
    ApiNetworkClusterService,
    ApiNetworkProvisionService,
    ApiNetworkService,
    ApiNetworkResolverService,
    ApiNetworkResolverAnybodiesService,
    ApiNetworkResolverSolanaFungibleService,
    ApiNetworkResolverSolanaNonFungibleService,
  ],
  exports: [ApiNetworkService],
})
export class ApiNetworkDataAccessModule {}
