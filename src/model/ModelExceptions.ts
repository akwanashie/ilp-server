export class ModelFormatException extends Error {
  constructor(message: string) {
    super(`Could not parse model: ${message}`);
    (<any>Object).setPrototypeOf(this, ModelFormatException.prototype)
  }
}

export class VariableFormatException extends Error {
  constructor(message: string) {
    super(`Could not parse variable: ${message}`);
    (<any>Object).setPrototypeOf(this, VariableFormatException.prototype)
  }
}

export class ConstraintFormatException extends Error {
  constructor(message: string) {
    super(`Could not parse constraint: ${message}`);
    (<any>Object).setPrototypeOf(this, ConstraintFormatException.prototype)
  }
}