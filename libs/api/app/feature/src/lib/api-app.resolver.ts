import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { App } from '@pubkey-link/api-app-data-access'
import { AppUser } from '@pubkey-link/api-app-user-data-access'

@Resolver(() => App)
export class ApiAppResolver {
  @ResolveField(() => AppUser, { nullable: true })
  user(@Parent() app: App) {
    return app.users?.length ? (app.users[0] as AppUser) : null
  }
}
