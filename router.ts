import { Router } from "./deps.ts"
import { usersRouter } from './router/UsersRouter.ts'
import { todosRouter } from './router/TodosRouter.ts'

const apiRouter = new Router({ prefix: '/api/v1' })

// Users router
apiRouter.use(
  usersRouter.routes(),
  usersRouter.allowedMethods()
)

// Todos router
apiRouter.use(
  todosRouter.routes(),
  todosRouter.allowedMethods()
)

export { apiRouter }