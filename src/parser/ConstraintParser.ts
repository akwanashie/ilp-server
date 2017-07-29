import { Constraint, EQUALITY } from '../model/Model'
import { ConstraintFormatException } from '../model/ModelExceptions'
import { isNonEmptyOrThrow } from './Validator'

export class ConstraintParser {
  parse(rawConstraint): Constraint {
    if (isNonEmptyOrThrow(rawConstraint, new ConstraintFormatException('input string is empty'))) {
      return {
        expression: [],
        equality: this.getEquality(rawConstraint),
        value: 0
      }
    }
    throw new Error()
  }

  getEquality (rawConstraint): string {
    const equality = EQUALITY.values().filter((equality) => rawConstraint.toString().includes(equality))
    if (equality.length === 0) {
      throw new ConstraintFormatException('no equality value found')
    }
    else if (equality.length > 1) {
        throw new ConstraintFormatException('multiple equality values found')
    }
    else return equality[0]
  }
}