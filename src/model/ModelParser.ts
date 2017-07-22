import { Model, Variable } from './Model'
import { ModelFormatException } from './ModelExceptions'

export class ModelParser {
  parse(rawJson: object): Model {
    const variables = this.extractVariables()
    return
  }

  private extractVariables(): Variable[] {
    throw new ModelFormatException('no variables provided')
  }
}