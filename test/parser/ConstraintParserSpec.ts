import * as chai from 'chai'
const should = chai.should()
import * as random from 'generate-random-data'

import { ConstraintFormatException } from '../../src/model/ModelExceptions'
import { ConstraintParser } from '../../src/parser/ConstraintParser'
import { EQUALITY } from '../../src/model/Model'

describe('ConstraintParser', () => {
  const randomEquality = () => EQUALITY.values()[random.integer(0, EQUALITY.values().length - 1)]

  describe('parse', () => {
    it('should throw a ConstraintFormatException if the input is not a string', () => {
      const constraintParser = new ConstraintParser()
      should.throw(() => constraintParser.parse({}), ConstraintFormatException, /constraint input must be a string/)
    })

    it('should throw a ConstraintFormatException if the input string is empty', () => {
      const constraintParser = new ConstraintParser()
      should.throw(() => constraintParser.parse(''), ConstraintFormatException, /input string is empty/)
    })

    it('should throw a ConstraintFormatException if the input string contains only empty spaces', () => {
      const constraintParser = new ConstraintParser()
      should.throw(() => constraintParser.parse(''), ConstraintFormatException, /input string is empty/)
    })

    it('should throw a ConstraintFormatException if input string does not contain an equality', () => {
      const inputConstraint = EQUALITY.values().reduce((acc, val) => acc.replace(val, ''), random.string('lower', 10, 100))
      const constraintParser = new ConstraintParser()
      should.throw(() => constraintParser.parse(inputConstraint), ConstraintFormatException, /no equality value found/)
    })

    it('should throw a ConstraintFormatException if the input string contains more than one equality', () => {
      const inputConstraint = `${random.string(10)} ${EQUALITY.EQ} ${random.string(10)} ${EQUALITY.LEQ} 30`
      const constraintParser = new ConstraintParser()
      should.throw(() => constraintParser.parse(inputConstraint), ConstraintFormatException, /multiple equality values found/)
    })

    it('should return a constraint with the correct equality', () => {
      const equalityValue = randomEquality()
      const inputConstraint = `${random.string(10)} ${equalityValue} ${random.integer(10, 10)}`
      const constraintParser = new ConstraintParser()
      constraintParser.parse(inputConstraint).equality.should.eql(equalityValue)
    })

    it('should throw a ConstraintFormatException if the input ends with an equality', () => {
      const inputConstraint = `${random.string(10)} ${EQUALITY.EQ} `
      const constraintParser = new ConstraintParser()
      should.throw(() => constraintParser.parse(inputConstraint), ConstraintFormatException, /no RHS value found/)
    })

    it('should throw a ConstraintFormatException if the RHS is not a number', () => {
      const inputConstraint = `${random.string(10)} ${randomEquality()} abc${random.string(10)}xyz`
      const constraintParser = new ConstraintParser()
      should.throw(() => constraintParser.parse(inputConstraint), ConstraintFormatException, /RHS must be a number/)
    })

    it('returns the correct RHS value', () => {
      const value = random.integer(10, 100)
      const inputConstraint = `${random.string(10)} ${randomEquality()} ${value}`
      const constraintParser = new ConstraintParser()
      constraintParser.parse(inputConstraint).value.should.eql(value)
    })

    it('returns the correct RHS value when it is negetive', () => {
      const value = -1 * random.integer(10, 100)
      const inputConstraint = `${random.string(10)} ${randomEquality()} ${value}`
      const constraintParser = new ConstraintParser()
      constraintParser.parse(inputConstraint).value.should.eql(value)
    })

    it('returns the correct RHS value when it is a decimal', () => {
      const value = random.float(1, 9, 0, 99, 2)
      const inputConstraint = `${random.string(10)} ${randomEquality()} ${value}`
      const constraintParser = new ConstraintParser()
      constraintParser.parse(inputConstraint).value.should.eql(value)
    })

    it('returns the correct RHS value when it has spaces appended', () => {
      const value = random.float(1, 9, 0, 99, 2)
      const inputConstraint = `${random.string(10)} ${randomEquality()} ${value}   `
      const constraintParser = new ConstraintParser()
      constraintParser.parse(inputConstraint).value.should.eql(value)
    })
  })
})