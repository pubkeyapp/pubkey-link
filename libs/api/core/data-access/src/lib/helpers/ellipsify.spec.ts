import { ellipsify } from './ellipsify'

describe('ellipsify', () => {
  it('should return the same string if its length is less than twice the specified length plus the delimiter length', () => {
    expect(ellipsify('test', 4)).toEqual('test')
  })

  it('should return the ellipsified string if its length is more than twice the specified length plus the delimiter length', () => {
    expect(ellipsify('testing', 2)).toEqual('te..ng')
  })

  it('should use the specified delimiter for ellipsification', () => {
    expect(ellipsify('testing', 2, '...')).toEqual('te...ng')
  })

  it('should return the same string if no length is specified and the string length is less than 10', () => {
    expect(ellipsify('test')).toEqual('test')
  })

  it('should return the ellipsified string if no length is specified and the string length is more than 10', () => {
    expect(ellipsify('testingtesting')).toEqual('test..ting')
  })
})
