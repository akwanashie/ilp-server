import { Model, Variable } from './Model'
import { ModelFormatException, VariableFormatException } from './ModelExceptions'
import { getArrayOrThrow } from '../util'

export class ModelParser {
  constructor(private readonly variableParser: VariableParser) {}

  parse(rawJson): Model {
    const variables = getArrayOrThrow(rawJson.variables, new ModelFormatException('no variables provided'))
      .map(this.variableParser.parse)

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

export class VariableParser {
  parse(rawVariable): Variable {
    if (typeof rawVariable === 'string') {
      return {
        name: rawVariable,
        value: 0,
        isInteger: true
      }
    } else {
      throw new VariableFormatException('variable name must conform to standards')
    }
  }
}