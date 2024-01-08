import slugify from 'slugify'

export function slugifyId(id: string): string {
  return slugify(id, { lower: false, strict: true })
}
