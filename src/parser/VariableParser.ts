import { Variable } from '../model/Model'
import { VariableFormatException } from '../model/ModelExceptions'

export class VariableParser {
  parse(rawVariable): Variable {
    if (
      this.isString(rawVariable) && 
      this.isNonEmpty(rawVariable) && 
      this.startsWithString(rawVariable)
    ) {
      return {
        name: rawVariable,
        value: 0,
        isInteger: true
      }
    }
  }

  private isString(rawVariable): boolean {
    if (typeof rawVariable === 'string') {
      return true
    } else {
      throw new VariableFormatException('variable name must be a string')
    }
  }

  private isNonEmpty(rawVariable): boolean {
    if (rawVariable.trim().length > 0) {
      return true
    } else {
      throw new VariableFormatException('variable name must not be empty')
    }
  }

  private startsWithString(rawVariable): boolean {
    if (rawVariable.match(/\d+(.*)/)) {
      throw new VariableFormatException('variable name must not start with an integer')
    } else {
      return true
    }
  }
}