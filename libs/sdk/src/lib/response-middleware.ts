// This middleware is used to catch errors from the API and throw them as errors
// FIXME: This is a workaround for a bug in graphql-request:
//  https://github.com/jasonkuhrt/graphql-request/issues/509
//  https://github.com/jasonkuhrt/graphql-request/issues/201
export function responseMiddleware<T>(response: T) {
  if (response instanceof Error) {
    const error: {
      message: string
      code?: string
      response: {
        error?: string
        errors?: { message: string }[]
      }
    } = JSON.parse(JSON.stringify(response, undefined, 2))

    if (error.response?.errors?.length) {
      throw new Error(error.response.errors[0].message)
    }
    if (error.response?.error) {
      throw new Error(error.response.error)
    }
    if (error?.code === 'ECONNREFUSED') {
      throw new Error('Connection refused')
    }
    throw new Error(`Unknown error: ${error?.message} ${error?.code}`)
  }
}
