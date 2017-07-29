export function isNonEmptyArray(input: any[]): boolean {
  return input && Array.isArray(input) && input.length > 0
}

export function getArrayOrThrow(input, error: Error): any[] {
  if (isNonEmptyArray(input)) {
    return input
  } else {
    throw error
  }
}