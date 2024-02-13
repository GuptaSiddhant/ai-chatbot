import { rest } from 'msw'
import { mockedExampleApiResult } from './mockedTodos'

export const exampleApiMockedTodosHandlers = [
  rest.get('https://dummyjson.com/todos', (_req, res, ctx) => {
    console.log('interceoting todos')
    return res(ctx.status(200), ctx.json({ ...mockedExampleApiResult }))
  }),
]
