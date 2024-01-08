export function getApiUrl(path = '') {
  const host = process.env.HOST ?? 'localhost'
  const port = process.env.PORT ?? '3000'

  return `http://${host}:${port}${path}`
}
