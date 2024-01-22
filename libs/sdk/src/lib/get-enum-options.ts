export function getEnumOptions<T extends Record<string, string>>(
  enumObject: T,
): { label: string; value: T[keyof T] }[] {
  return Object.keys(enumObject).map((key: string) => ({
    label: key,
    value: enumObject[key as keyof T],
  }))
}
