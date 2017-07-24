import * as chai from 'chai'
const should = chai.should()
import * as random from 'generate-random-data'

import { ModelParser } from '../../src/parser/ModelParser'
import { VariableParser } from '../../src/parser/VariableParser'

import { ModelFormatException, VariableFormatException } from '../../src/model/ModelExceptions'

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
  })
})
