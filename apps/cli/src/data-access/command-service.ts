import { names } from '@nx/devkit'
import { NetworkCluster } from '@pubkey-link/sdk'
import { getCliConfig } from '../utils/get-cli-config'

export class CommandService {
  constructor(private readonly config: { keypair: string; server: string }) {}

  async backupGet(name: string) {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminGetBackup({ name }, { cookie })
    if (!res.data?.item) {
      console.log('Backup not found')
      return
    }
    console.log(res.data.item)
  }

  async backupList() {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminGetBackups({}, { cookie })
    if (!res.data?.items?.length) {
      console.log('No backups found')
      return
    }
    console.log(res.data?.items)
  }

  async backupRestore(name: string) {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminRestoreBackup({ name }, { cookie })
    if (!res.data?.restored) {
      console.log('Failed to restore backup')
      return
    }
    console.log('Restored backup')
  }

  async communityGet(communityId: string) {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminFindOneCommunity({ communityId }, { cookie })
    if (!res.data?.item) {
      console.log('Community not found')
      return
    }
    console.log(res.data.item)
  }

  async communityList() {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminFindManyCommunity({ input: {} }, { cookie })
    if (!res.data?.paging.meta.totalCount) {
      console.log('No communities found')
      return
    }
    console.log(`Found ${res.data.paging.meta.totalCount} communities`)
    for (const { id, name, description, cluster } of res.data.paging.data) {
      console.log(`- [${cluster}] [${id}] ${name} - ${description}`)
    }
  }

  async networkGet(networkId: string) {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminFindOneNetwork({ networkId }, { cookie })
    if (!res.data?.item) {
      console.log('Network not found')
      return
    }
    console.log(res.data.item)
  }
  async networkList() {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminFindManyNetwork({ input: {} }, { cookie })
    if (!res.data?.paging?.data) {
      console.log('No networks found')
      return
    }
    console.log(`Found ${res.data.paging.meta.totalCount} networks on ${this.config.server}`)
    for (const { id, cluster, endpoint } of res.data.paging.data) {
      console.log(`- ${id} ${cluster} ${endpoint}`)
    }
  }
  async networkSync(cluster: string) {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminSyncNetworkAssets({ cluster: names(cluster).className as NetworkCluster }, { cookie })
    if (!res.data?.synced) {
      console.log('Failed to sync network assets')
      return
    }
    console.log(res.data.synced ? 'Synced network assets' : 'Failed to sync network assets')
  }
  async snapshotGet(snapshotId: string) {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminFindOneSnapshot({ snapshotId }, { cookie })
    if (!res.data?.item) {
      console.log('Snapshot not found')
      return
    }
    const { data, role, ...rest } = res.data.item
    console.log({ role: { id: role.id, name: role.name, communityId: role.communityId }, ...rest })
    console.log(JSON.stringify(data ?? [], null, 2))
  }

  async snapshotList() {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminFindManySnapshot({ input: {} }, { cookie })
    if (!res.data?.paging.meta?.totalCount) {
      console.log('No snapshots found')
      return
    }
    console.log(`Found ${res.data.paging.meta.totalCount} snapshots`)
    for (const { id, name, createdAt } of res.data.paging.data) {
      console.log(`- [${id}] ${name} - ${createdAt}`)
    }
  }

  async snapshotCreate(roleId: string) {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.adminCreateSnapshot({ input: { roleId } }, { cookie })
    if (!res.data?.created) {
      console.log('Failed to create snapshot')
      return
    }
    console.log('Created snapshot')
    const { role, ...rest } = res.data.created
    console.log({ role: { id: role.id, name: role.name, communityId: role.communityId }, ...rest })
  }
  async uptime() {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.uptime({}, { cookie })
    if (!res.data?.uptime) {
      console.log('Failed to get user')
      return
    }
    console.log(res.data.uptime)
  }

  async whoami() {
    const { cookie, sdk } = await this.getConfig()
    const res = await sdk.me({}, { cookie })
    if (!res.data?.me) {
      console.log('Failed to get user')
      return
    }
    console.log(res.data.me)
  }

  private async getConfig() {
    const { cookie, sdk } = await getCliConfig(this.config.server, this.config.keypair)

    return { cookie, sdk }
  }
}
