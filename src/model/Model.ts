export class Variable {
  name: string
  value: number
  isInteger: boolean
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