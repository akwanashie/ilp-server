import { Model, Variable } from './Model'
import { ModelFormatException } from './ModelExceptions'

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
    if(rawVariables
      && Array.isArray(rawVariables)
      && rawVariables.length > 0) {
        return rawVariables.map((rawVariable) => {
          return {
            name: rawVariable.toString(),
            value: 0
          }
        })
    } else {
      throw new ModelFormatException('no variables provided')
    }
  }
}