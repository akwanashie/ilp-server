import * as chai from 'chai'
const should = chai.should()
import * as random from 'generate-random-data'

import { ModelParser, VariableParser } from '../src/model/ModelParser'
import { ModelFormatException, VariableFormatException } from '../src/model/ModelExceptions'

describe('ModelParser', () => {
  describe('parse', () => {
    it('should throw a ModelFormatException if no variable property is provided', () => {
      const rawJson = {}
      const variableParser = new VariableParser()
      const modelParser = new ModelParser(variableParser)

      should.throw(() => modelParser.parse(rawJson), ModelFormatException, /no variables provided/)
    })

    it('should throw a ModelFormatException if variable property is an empty array', () => {
      const rawJson = {
        variables: []
      }
      const variableParser = new VariableParser()
      const modelParser = new ModelParser(variableParser)

      should.throw(() => modelParser.parse(rawJson), ModelFormatException, /no variables provided/)
    })

    it('should throw a VariableFormatException if the variable provided is not a string', () => {
      const rawJson = {
        variables: random.array(() => random.int(10, 100), 10)
      }

      const variableParser = new VariableParser()
      const modelParser = new ModelParser(variableParser)
      should.throw(() => modelParser.parse(rawJson), VariableFormatException, /variable name must conform to standards/)
    })

    it('should return a model with the correct variable', () => {
      const variableNames = random.array(() => random.str('lower', 10, 10), 10)
      const rawJson = {
        variables: variableNames
      }

      const variableParser = new VariableParser()
      const modelParser = new ModelParser(variableParser)
      modelParser.parse(rawJson)
        .variables.map((variable) => variable.name)
        .should.eql(variableNames)
    })

    it('should return a model with variables having their default calues', () => {
      const rawJson = {
        variables: random.array(() => random.str('lower', 10, 10), 10)
      }

      const variableParser = new VariableParser()
      const modelParser = new ModelParser(variableParser)
      modelParser.parse(rawJson)
        .variables.forEach((variable) => {
          variable.isInteger.should.be.true
          variable.value.should.eql(0)
        })
    })
  })
})
