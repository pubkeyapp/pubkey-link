// Helpers to break a string but still validate as a valid signature/challenge
export function breakStringSolana(str: string) {
  return str.replace('A', 'a').replace('B', 'b').replace('C', 'c').replace('D', 'd')
}
