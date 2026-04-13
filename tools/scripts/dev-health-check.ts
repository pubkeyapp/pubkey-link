#!/usr/bin/env node
/**
 * Health check script for development services
 * Waits for postgres and redis to be ready with retry logic
 */

import { execSync } from 'child_process'
import { setTimeout } from 'timers/promises'

interface ServiceCheck {
  name: string
  command: string
  port: number
}

const SERVICES: ServiceCheck[] = [
  {
    name: 'PostgreSQL',
    command: 'pg_isready -h localhost -p 5432',
    port: 5432,
  },
  {
    name: 'Redis',
    command: 'redis-cli -h localhost -p 6379 ping',
    port: 6379,
  },
]

const MAX_RETRIES = 30
const RETRY_DELAY_MS = 1000

async function checkService(service: ServiceCheck, attempt: number): Promise<boolean> {
  try {
    execSync(service.command, { stdio: 'pipe' })
    console.log(`✓ ${service.name} is ready (attempt ${attempt}/${MAX_RETRIES})`)
    return true
  } catch {
    return false
  }
}

async function waitForService(service: ServiceCheck): Promise<void> {
  console.log(`⏳ Waiting for ${service.name} on port ${service.port}...`)

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    if (await checkService(service, attempt)) {
      return
    }

    if (attempt < MAX_RETRIES) {
      await setTimeout(RETRY_DELAY_MS)
    }
  }

  console.error(`✗ ${service.name} failed to start after ${MAX_RETRIES} attempts`)
  process.exit(1)
}

async function main() {
  console.log('🔍 Checking development services...\n')

  for (const service of SERVICES) {
    await waitForService(service)
  }

  console.log('\n✅ All services are ready!')
}

main().catch((error) => {
  console.error('Health check failed:', error)
  process.exit(1)
})
