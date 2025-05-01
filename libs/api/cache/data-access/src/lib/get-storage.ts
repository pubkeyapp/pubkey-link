import { createStorage, Storage } from 'unstorage'
import redisDriver from 'unstorage/drivers/redis'

export function getStorage({ redisUrl }: { redisUrl: string }): Storage {
  return createStorage({
    driver: redisDriver({ url: redisUrl }),
  })
}
