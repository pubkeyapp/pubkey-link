import { REST } from '@discordjs/rest'
import { Client, GatewayIntentBits } from 'discord.js'

export function createDiscordClient(
  token: string,
  intents: GatewayIntentBits[] = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
): Promise<Client> {
  return new Promise((resolve, reject) => {
    const client = new Client({ intents })
    client.once('ready', () => resolve(client))
    client.login(token).catch((e) => {
      reject(e)
    })
  })
}

export function createDiscordRestClient(token: string): REST {
  return new REST({ version: '10' }).setToken(token)
}
