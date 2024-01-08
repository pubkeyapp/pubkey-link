import axios from 'axios'
import { sdk } from '../support'

describe('api-core-feature', () => {
  describe('api-core-controller', () => {
    it('should retrieve the uptime (REST)', async () => {
      const res = await axios.get(`/api/uptime`)

      expect(res.status).toBe(200)
      expect(res.data).toBeGreaterThan(0)
    })
  })

  describe('api-core-resolver', () => {
    it('should retrieve the uptime (GraphQL)', async () => {
      const res = await sdk.uptime()

      expect(res.data.uptime).toBeGreaterThan(0)
    })
  })
})
