import { Tree } from '@nx/devkit'
import { parse } from 'dotenv'
import { validateEnvFile } from '../../lib/setup/validate-env-file'
import {
  ensureDockerIsRunning,
  ensurePostgresConnection,
  isDockerComposeRunning,
  runPrismaSetup,
} from '../../lib/setup/validate-postgres-connection'

export async function setupGenerator(tree: Tree) {
  // ENV file validation
  const validEnv = validateEnvFile(tree)

  if (!validEnv) {
    console.log(`❌ Invalid .env file.`)
    return
  }
  console.log(`✅ Valid .env file.`)

  // Docker validation
  const docker = await ensureDockerIsRunning()
  if (!docker) {
    console.log('THIS IS THE PROBLEM')
    console.log(`❌ Docker is not running. Make sure Docker is running and try again.`)
    return
  }
  console.log(`✅ Docker is running.`)

  // Docker Compose validation
  const dockerCompose = await isDockerComposeRunning()
  if (!dockerCompose) {
    console.log(`❌ Docker Compose is not running. Run 'pnpm dev:services' to start the services.`)
    return
  }
  console.log(`✅ Docker Compose is running.`)

  // Postgres connection validation
  const databaseUrl = parse(tree.read('.env').toString())['DATABASE_URL']
  const validPostgres = await ensurePostgresConnection(databaseUrl)
  if (!validPostgres) {
    console.log(
      `❌ Invalid Postgres connection. Make sure Postgres is running and try again and check the DATABASE_URL in your .env file.`,
    )
    return
  }
  console.log(`✅ Valid Postgres connection.`)

  const prisma = runPrismaSetup()
  if (!prisma) {
    console.log(`❌ Prisma setup failed.`)
    return
  }
  console.log(`✅ Prisma setup is done.`)
}

export default setupGenerator
