import { Tree } from '@nx/devkit'
import { parse } from 'dotenv'

export function validateEnvFile(tree: Tree) {
  const envFile = `.env`
  const envFileExample = `.env.example`

  const foundEnvFile = tree.exists(envFile)
  const foundEnvFileExample = tree.exists(envFileExample)

  if (!foundEnvFileExample) {
    throw new Error(`Missing ${envFileExample} file.`)
  }

  if (!foundEnvFile) {
    console.log(`Creating ${envFile} file.`)
    tree.write(envFile, tree.read(envFileExample))
  }

  const parsedEnvFile = parse(tree.read(envFile).toString())
  const parsedEnvFileExample = parse(tree.read(envFileExample).toString())

  const envKeys = Object.keys(parsedEnvFile)
  const envExampleKeys = Object.keys(parsedEnvFileExample)

  const missingKeys = envExampleKeys.filter((key) => !envKeys.includes(key))
  const extraKeys = envKeys.filter((key) => !envExampleKeys.includes(key))
  const emptyKeys = envKeys.filter((key) => !parsedEnvFile[key])

  if (missingKeys.length) {
    console.warn(`Missing keys in ${envFile}: ${missingKeys.join(', ')}`)
  }
  if (extraKeys.length) {
    console.warn(`Extra keys in ${envFile}: ${extraKeys.join(', ')}`)
  }
  if (emptyKeys.length) {
    console.log(`❌ Please set the following keys in ${envFile}:`)
    console.warn(`- ${emptyKeys.join('\n- ')}`)
  }

  return !(missingKeys.length || extraKeys.length || emptyKeys.length)
}
