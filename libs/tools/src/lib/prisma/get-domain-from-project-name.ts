export function getDomainFromProjectName(project: string, app: string) {
  return (
    project
      // Remove the data-access suffix from the path
      .replace('/data-access', '')
      // Remove everything with ${app}/ and before it
      .replace(new RegExp(`.*${app}/`), '')
  )
}
