// This middleware is used to catch errors from the API and throw them as errors
// FIXME: This is a workaround for a bug in graphql-request:
//  https://github.com/jasonkuhrt/graphql-request/issues/509
//  https://github.com/jasonkuhrt/graphql-request/issues/201
export function responseMiddleware<T>(response: T) {
  if (response instanceof Error) {
    const error: { response: { errors: { message: string }[] } } = JSON.parse(JSON.stringify(response, undefined, 2))

    if (error.response?.errors?.length) {
      throw new Error(error.response.errors[0].message)
    }
    throw new Error(`Unknown error: ${error}`)
  }
}
