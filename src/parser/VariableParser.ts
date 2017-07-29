import { Variable } from '../model/Model'
import { VariableFormatException } from '../model/ModelExceptions'
import { isNonEmptyOrThrow, isStringOrThrow, startsWithStringOrThrow } from './Validator'

export class VariableParser {
  parse(rawVariable): Variable {
    if (
      isStringOrThrow(rawVariable, 
        new VariableFormatException('variable name must be a string')) && 
      isNonEmptyOrThrow(rawVariable, 
        new VariableFormatException('variable name must not be empty')) && 
      startsWithStringOrThrow(rawVariable, 
        new VariableFormatException('variable name must not start with an integer'))
    ) {
      return {
        name: rawVariable,
        value: 0,
        isInteger: true
      }
    }
  }
}