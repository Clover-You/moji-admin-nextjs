export function has(str?: string) {
  const size = trim(str)?.length ?? 0
  return size > 0
}

export function trim(str?: string) {
  return str?.trim()
}
