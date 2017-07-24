import * as chai from 'chai'
const should = chai.should()
import * as random from 'generate-random-data'
import { VariableParser } from '../../src/parser/VariableParser'
import { VariableFormatException } from '../../src/model/ModelExceptions'

describe('VariableParser', () => {
  describe('parse', () => {
    it('should throw a VariableFormatException if the variable provided is not a string', () => {
      const variableParser = new VariableParser()
      should.throw(() => variableParser.parse(random.int(10, 100)), VariableFormatException, /variable name must be a string/)
    })

    it('should throw a VariableFormatException if the variable provided is an empty string', () => {
      const variableParser = new VariableParser()
      should.throw(() => variableParser.parse(''), VariableFormatException, /variable name must not be empty/)
    })

    it('should throw a VariableFormatException if the variable name starts with a number', () => {
      const name = `${random.int(1, 1)}${random.string('lower', 10, 10)}`
      const variableParser = new VariableParser()
      should.throw(() => variableParser.parse(name), VariableFormatException, /variable name must not start with an integer/)
    })

    it('should return a variable with the correct default values', () => {
      const variableParser = new VariableParser()
      const variable = variableParser.parse(random.string('lower', 10, 10))
      variable.isInteger.should.be.true
      variable.value.should.eql(0)
    })

    it('should a variable with the correct name', () => {
      const variableName = random.str('lower', 10, 10)
      const variableParser = new VariableParser()
      const variable = variableParser.parse(variableName)
      variable.name.should.eql(variableName)
    })
  })
})