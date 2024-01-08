import { normalizePrismaModelSchema } from './normalize-prisma-model-schema'

describe('normalize-prisma-model-schema', () => {
  it.each([
    { name: 'test', normalizeName: 'Test', normalizedLabel: 'name' },
    { name: 'test-model', label: 'title', normalizeName: 'TestModel', normalizedLabel: 'title' },
    { name: 'test_model', label: 'NAme', normalizeName: 'TestModel', normalizedLabel: 'name' },
    { name: 'testModel', label: 'tITLE', normalizeName: 'TestModel', normalizedLabel: 'title' },
    { name: 'test model', label: 'name', normalizeName: 'TestModel', normalizedLabel: 'name' },
  ])(`should normalize model input with name (%p)`, ({ name, label, normalizeName, normalizedLabel }) => {
    const normalized = normalizePrismaModelSchema({ name, label })

    expect(normalized.name).toBe(normalizeName)
    expect(normalized.label).toBe(normalizedLabel)
  })
})
