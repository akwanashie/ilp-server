import { Constraint, EQUALITY } from '../model/Model'
import { ConstraintFormatException } from '../model/ModelExceptions'
import { isNonEmptyOrThrow, isStringOrThrow } from './Validator'

export class ConstraintParser {
  parse(rawConstraint): Constraint {
    if (
      isStringOrThrow(rawConstraint, new ConstraintFormatException('constraint input must be a string')) &&
      isNonEmptyOrThrow(rawConstraint, new ConstraintFormatException('input string is empty'))
    ) {
      const equality = this.getEquality(rawConstraint)
      const value = this.getValue(rawConstraint)
      return {
        expression: [],
        equality,
        value
      }
    }
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

  getValue (rawConstraint): number {
    const equality = this.getEquality(rawConstraint)
    if(rawConstraint.toString().endsWith(equality)) {
      throw new ConstraintFormatException('no RHS value found')
    }
    else return 0
  }
}