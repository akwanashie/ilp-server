export class Variable {
  name: string
  value: number
  isInteger: boolean
}

export const EQUALITY = {
  GEQ: '>=',
  LEQ: '<=',
  EQ: '=',
  LE: '<',
  GE: '>',
  values: () => Object.keys(EQUALITY).map((key) => EQUALITY[key])
}

export interface Term {
  prefix: number
  variable: Variable
}

export interface Constraint {
  expression: Term[]
  equality: string
  value: number
}

export interface Objective {
  expression: Term[]
  direction: string
}

export interface Model {
  variables: Variable[]
  constraints: Constraint[]
  objective: Objective
}