import { Constraint, EQUALITY } from '../model/Model'
import { ConstraintFormatException } from '../model/ModelExceptions'
import { isNonEmptyOrThrow } from './Validator'

export class ConstraintParser {
  parse(rawConstraint): Constraint {
    if (
      isNonEmptyOrThrow(rawConstraint, new ConstraintFormatException('input string is empty')) &&
      this.containsSingleEquality(rawConstraint)
    ) {
      return 
    }
    throw new Error()
  }

  containsSingleEquality (rawConstraint): boolean {
    const equality = EQUALITY.values().filter((equality) => rawConstraint.toString().includes(equality))
    if (equality.length > 0) {
      if (equality.length > 1) {
        throw new ConstraintFormatException('multiple equality values found')
      } else return true
    } else {
      throw new ConstraintFormatException('no equality value found')
    } 
  }
}