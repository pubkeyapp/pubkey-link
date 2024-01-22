export function parsePrismaModelFields(fields: string[]): ParsedPrismaModelField[] {
  return fields
    .map((field) => (field.includes(':') ? field : `${field}: String`))
    .map((field) => {
      const [name, type, attrs] = field.split(':')
      const isOptional = type.includes('?')

      return {
        name,
        type: type.replace('?', ''),
        isOptional,
        attributes: attrs?.length
          ? attrs.split('@').map((attr) => {
              const [name, params] = attr.split('(')
              return {
                name,
                params: params?.split(',').map((param) => {
                  const [name] = param.split(')')
                  return { name }
                }),
              }
            })
          : [],
      }
    })
}

export interface ParsedPrismaModelField {
  name: string
  type: string
  isOptional?: boolean
  attributes?: { name: string; params?: { name: string; params?: string[] }[] }[]
}
