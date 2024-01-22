/* eslint-disable */
import axios from 'axios'
import { getApiUrl } from './get-api.url'
var __TEARDOWN_MESSAGE__: string

module.exports = async function () {
  // Start services that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n')

  const apiRunning = await ensureApiRunning()
  if (!apiRunning) {
    throw new Error('\nSETUP FAILED: API is not running')
  }

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n'
}

async function ensureApiRunning() {
  const apuIrl = getApiUrl()
  try {
    await axios.get(`${apuIrl}/api/uptime`)
    console.log('Server is running at', apuIrl, '\n')
    return true
  } catch (e) {
    if (process.env.CI) {
      return await startApi()
    }
    return false
  }
}

export function startApi(): Promise<boolean> {
  console.log(`\nSTARTING API SERVER AT ${getApiUrl()}\n`)
  // Start the API server by running `pnpm start` and wait for the output to include 'GraphQL is running on'.
  return new Promise<boolean>((resolve) => {
    const childProcess = require('child_process')
    const child = childProcess.spawn('pnpm', ['start'], {
      stdio: 'pipe',
    })
    globalThis.pid = child.pid

    child.stdout.on('data', (data: any) => {
      const output = data.toString()
      console.log(output)
      if (output.includes('GraphQL is running on')) {
        console.log(`\nAPI SERVER STARTED AT ${getApiUrl()}\n`)
        resolve(true)
      }
    })
    child.stderr.on('data', (data: any) => {
      console.log(data.toString())
    })
    child.on('close', () => {
      resolve(false)
    })
  })
}
