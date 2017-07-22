import { Model, Variable } from './Model'
import { ModelFormatException, VariableFormatException } from './ModelExceptions'

export class ModelParser {
  parse(rawJson): Model {
    const variables = this.extractVariables(rawJson.variables)

    return {
      variables,
      constraints: [],
      objective: {
        direction: '',
        expression: {
          prefix: 0,
          variable: {
            name: '',
            value: 0
          }
        }
      }
    }
  }

  private extractVariables(rawVariables): Variable[] {
    if (this.isNonEmptyArray(rawVariables)) {
        return rawVariables.map((rawVariable) => {
          if (typeof rawVariable === 'string') {
            return {
              name: rawVariable,
              value: 0
            }
          } else {
            throw new VariableFormatException('variable name must conform to standards')
          }
        })
    } else {
      throw new ModelFormatException('no variables provided')
    }
  }

  private isNonEmptyArray(input: any[]): boolean {
    return input && Array.isArray(input) && input.length > 0
  }
}