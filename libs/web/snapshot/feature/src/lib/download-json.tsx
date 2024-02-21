export function downloadJson(name: string, data: unknown) {
  const element = document.createElement('a')
  const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  element.href = URL.createObjectURL(file)
  element.download = `${name}.json`
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

export function downloadCsv(name: string, lines: string[]) {
  const element = document.createElement('a')
  const file = new Blob([lines.join('\n')], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = `${name}.csv`
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}
