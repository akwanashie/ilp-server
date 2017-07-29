import { Model, Variable } from '../model/Model'
import { ModelFormatException, VariableFormatException } from '../model/ModelExceptions'
import { VariableParser } from './VariableParser'
import { getArrayOrThrow } from '../util'

export class ModelParser {
  constructor(private readonly variableParser: VariableParser) {}

  parse(rawJson): Model {
    const variables = getArrayOrThrow(rawJson.variables, new ModelFormatException('no variables provided'))
      .map((rawVariable) => this.variableParser.parse(rawVariable))

    return {
      variables,
      constraints: [],
      objective: {
        direction: '',
        expression: {
          prefix: 0,
          variable: {
            name: '',
            value: 0,
            isInteger: true
          }
        }
      }
    }
  }
}