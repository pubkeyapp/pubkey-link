import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { ApiBackupService } from '@pubkey-link/api-backup-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminBackupResolver {
  constructor(private readonly service: ApiBackupService) {}

  @Mutation(() => Boolean)
  adminCreateBackup() {
    return this.service.createBackup()
  }

  @Mutation(() => Boolean)
  adminDeleteBackup(@Args('name') name: string) {
    return this.service.deleteBackup(name)
  }

  @Mutation(() => Boolean)
  adminFetchBackup(@Args('url') url: string) {
    return this.service.fetchBackup(url)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminGetBackup(@Args('name') name: string) {
    return this.service.adminGetBackup(name)
  }
  @Query(() => [String])
  adminGetBackups() {
    return this.service.adminGetBackups()
  }

  @Mutation(() => Boolean)
  adminRestoreBackup(@Args('name') name: string) {
    return this.service.restoreBackup(name)
  }
}
