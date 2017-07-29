import * as chai from 'chai'
const should = chai.should()
import * as random from 'generate-random-data'
import * as td from 'testdouble'

import { ModelParser } from '../../src/parser/ModelParser'
import { VariableParser } from '../../src/parser/VariableParser'

import { ModelFormatException, VariableFormatException } from '../../src/model/ModelExceptions'

describe('ModelParser', () => {
  beforeEach(() => {
    td.config({ ignoreWarnings: true })
  })

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

    it('should call the variable parser with the right arguments', () => {
      const variableName = random.string('lower', 10, 10)
      const rawJson = {
        variables: [ variableName ]
      }
      const variableParser = td.object(new VariableParser())
      td.when(variableParser.parse(td.matchers.anything()))
        .thenReturn({
          name: variableName,
          value: 0,
          isInteger: true
        })
      const modelParser = new ModelParser(variableParser)
      modelParser.parse(rawJson)
      td.verify(variableParser.parse(variableName), { times: 1 })
    })
  })
})
