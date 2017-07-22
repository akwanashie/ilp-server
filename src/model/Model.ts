export interface Variable {
  name: string
  value: number
}

export interface Expression {
  prefix: number
  variable: Variable
}

export interface Constraint {
  expression: Expression[]
  equality: string
  value: number
}

export interface Objective {
  expression: Expression
  direction: string
}

export interface Model {
  variables: Variable[]
  constraints: Constraint[]
  objective: Objective
}