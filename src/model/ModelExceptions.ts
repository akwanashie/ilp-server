export class ModelFormatException extends Error {
  constructor(message: string) {
    super(`Could not parse model: ${message}`);
    (<any>Object).setPrototypeOf(this, ModelFormatException.prototype)
  }
}