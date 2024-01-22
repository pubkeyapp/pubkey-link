// For the API it lives here: libs/api/core/data-access/src/lib/helpers/ellipsify.ts
// This way, the API does not have to import the SDK.
export function ellipsify(str = '', len = 4, delimiter = '..') {
  const strLen = str.length
  const limit = len * 2 + delimiter.length

  return strLen >= limit ? str.substring(0, len) + delimiter + str.substring(strLen - len, strLen) : str
}
