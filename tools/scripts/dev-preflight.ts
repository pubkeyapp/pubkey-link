#!/usr/bin/env node
/**
 * Pre-flight checks before starting development
 * Validates environment setup
 */

import { existsSync } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'

interface Check {
  name: string
  validate: () => void | string
}

const MIN_NODE_VERSION = 18
const MIN_PNPM_VERSION = 8

const checks: Check[] = [
  {
    name: '.env file exists',
    validate: () => {
      if (!existsSync(resolve(process.cwd(), '.env'))) {
        return 'Missing .env file. Run: cp .env.example .env'
      }
    },
  },
  {
    name: 'Docker is running',
    validate: () => {
      try {
        execSync('docker info', { stdio: 'pipe' })
      } catch {
        return "Docker daemon is not running. Please start Docker Desktop (macOS/Windows) or run `sudo systemctl start docker` (Linux). If using OrbStack, ensure it's running."
      }
    },
  },
  {
    name: 'Node.js version',
    validate: () => {
      const version = process.version
      const major = parseInt(version.slice(1).split('.')[0])
      if (major < MIN_NODE_VERSION) {
        return `Node.js ${MIN_NODE_VERSION}+ required, found ${version}`
      }
    },
  },
  {
    name: 'PNPM is installed',
    validate: () => {
      try {
        const output = execSync('pnpm --version', { encoding: 'utf-8', stdio: 'pipe' })
        const version = output.trim()
        const major = parseInt(version.split('.')[0])
        if (major < MIN_PNPM_VERSION) {
          return `PNPM ${MIN_PNPM_VERSION}+ recommended, found ${version}`
        }
      } catch {
        return 'PNPM is not installed. Install with: npm install -g pnpm'
      }
    },
  },
]

function runChecks() {
  console.log('🚀 Running pre-flight checks...\n')

  let hasErrors = false

  for (const check of checks) {
    const result = check.validate()
    if (result) {
      console.error(`✗ ${check.name}: ${result}`)
      hasErrors = true
    } else {
      console.log(`✓ ${check.name}`)
    }
  }

  console.log()

  if (hasErrors) {
    console.error('❌ Pre-flight checks failed. Please fix the issues above.')
    process.exit(1)
  }

  console.log('✅ All pre-flight checks passed!\n')
}

runChecks()
