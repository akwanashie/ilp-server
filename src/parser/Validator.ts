export function isNonEmptyOrThrow(rawVariable, error: Error): boolean {
  if (rawVariable.trim().length > 0) {
    return true
  } else {
    throw error
  }
}

export function isStringOrThrow(rawVariable, error: Error): boolean {
  if (typeof rawVariable === 'string') {
    return true
  } else {
    throw error
  }
}

export function startsWithStringOrThrow(rawVariable, error: Error): boolean {
  if (rawVariable.match(/\d+(.*)/)) {
    throw error
  } else {
    return true
  }
}