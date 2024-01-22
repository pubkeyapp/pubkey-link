import { exec } from 'child_process'
import { Client } from 'pg'

async function connectToPostgres(url: string): Promise<Client> {
  const client = new Client(url)
  await client.connect()
  return client
}

async function canConnect(url: string): Promise<boolean> {
  try {
    await connectToPostgres(url)
    return true
  } catch (e) {
    return false
  }
}

export function ensureDockerIsRunning() {
  console.log(`🐳 Checking if Docker is running...`)
  return new Promise((resolve) => {
    exec('docker ps', async (error) => {
      if (error) {
        return resolve(false)
      }
      return resolve(true)
    })
  })
}

export async function isDockerComposeRunning(): Promise<boolean> {
  console.log(`🐳 Checking if Docker Compose is running...`)

  return new Promise((resolve) => {
    exec('docker compose top', async (error, stdout) => {
      if (error || stdout.trim() === '') {
        return resolve(false)
      }
      return resolve(true)
    })
  })
}

export function runPrismaSetup() {
  console.log(`🚀 Running Prisma setup...`)
  return new Promise((resolve) => {
    exec('pnpm prisma db push', async (error) => {
      if (error) {
        return resolve(false)
      }
      return resolve(true)
    })
  })
}

export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function ensurePostgresConnection(databaseUrl: string): Promise<boolean> {
  const MAX_RETRIES = 30

  console.log(`🐘 Connecting to Postgres...`)
  let count = 0
  let connected = false

  while (!connected && count < MAX_RETRIES) {
    connected = await canConnect(databaseUrl)
    await sleep()
    if (connected) {
      return Promise.resolve(true)
    }
    console.log(`🐘 Retrying Postgres connection... ${count + 1}/${MAX_RETRIES}`)
    count++
  }
  if (connected) {
    return Promise.resolve(true)
  }
  return Promise.reject(false)
}
