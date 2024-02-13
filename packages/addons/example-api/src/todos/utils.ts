import { IExampleApiTodo, IExampleApiTodosResult } from './types'
import { ITodo } from '@ddp-bot/types'

export const todoTransformer = (response: any) => {
  return response.json().then((data: IExampleApiTodo) => {
    return jsonToTodo(data)
  })
}

export const todosTransformer = (response: any) => {
  return response.json().then((data: IExampleApiTodosResult) => {
    return data.todos.map((apiTodo: IExampleApiTodo) => jsonToTodo(apiTodo))
  })
}

export const jsonToTodo = (json: IExampleApiTodo): ITodo => {
  return {
    id: json.id,
    title: json.todo,
    userId: json.userId.toString(),
    done: json.completed,
  }
}
