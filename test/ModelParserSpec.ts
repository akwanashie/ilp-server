import * as chai from 'chai'
const should = chai.should()

import { ModelParser } from '../src/model/ModelParser'
import { ModelFormatException } from '../src/model/ModelExceptions'


describe('parse', () => {
  it('should throw a ModelFormatException if no variable property is provided', () => {
    const rawJson = {}
    const modelParser = new ModelParser()
    
    should.throw(() => modelParser.parse(rawJson), ModelFormatException, /no variables provided/)
  })
})