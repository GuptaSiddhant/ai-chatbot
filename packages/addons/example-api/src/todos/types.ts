export interface IExampleApiTodosResult {
  todos: Array<IExampleApiTodo>
  total: number
  skip: number
  limit: number
}

export interface IExampleApiTodo {
  id: number
  todo: string
  completed: boolean
  userId: number
}
