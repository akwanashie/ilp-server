import * as chai from 'chai'
const should = chai.should()
import * as random from 'generate-random-data'

import { ModelParser } from '../src/model/ModelParser'
import { ModelFormatException } from '../src/model/ModelExceptions'


describe('parse', () => {
  it('should throw a ModelFormatException if no variable property is provided', () => {
    const rawJson = {}
    const modelParser = new ModelParser()
    
    should.throw(() => modelParser.parse(rawJson), ModelFormatException, /no variables provided/)
  })

  it('should throw a ModelFormatException if variable property is an empty array', () => {
    const rawJson = {
      variables: []
    }
    const modelParser = new ModelParser()
    
    should.throw(() => modelParser.parse(rawJson), ModelFormatException, /no variables provided/)
  })

  it('should return a model with the correct variable', () => {
    const variableName = random.str('lower', 10, 10)
    const rawJson = {
      variables: [ variableName ]
    }

    const modelParser = new ModelParser()
    modelParser.parse(rawJson).variables.should.deep.include({ name: variableName, value: 0 })
  })
})