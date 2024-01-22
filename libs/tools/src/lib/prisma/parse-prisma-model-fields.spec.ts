import { parsePrismaModelFields } from './parse-prisma-model-fields'

describe('parse-prisma-model-fields', () => {
  it.each([
    { fields: ['description:String', 'amount:Int'] },
    { fields: ['description:String?'] },
    { fields: ['owner:User', 'ownerId:String'] },
    { fields: ['owner:User?', 'ownerId:String?'] },
    {
      fields: [
        'title',
        'content',
        'views:Int',
        'owner:User?:relation@(fields: [ownerId], references: [id])',
        'ownerId:String?',
      ],
    },
  ])(`should normalize model input with name (%o)`, ({ fields }) => {
    const parsed = parsePrismaModelFields(fields)

    expect(parsed).toMatchSnapshot()
  })
})
