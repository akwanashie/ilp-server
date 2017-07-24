export function isNonEmptyArray(input: any[]): boolean {
  return input && Array.isArray(input) && input.length > 0
}

export function getArrayOrThrow<T>(input, error: Error): T[] {
  if (isNonEmptyArray(input)) {
    return input
  } else {
    throw error
  }
}