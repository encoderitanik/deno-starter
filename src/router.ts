import { Router } from "./deps.ts"
import { booksRouter } from './router/BooksRouter.ts'
import { usersRouter } from './router/UsersRouter.ts'

const apiRouter = new Router({ prefix: '/api/v1' })

// Users router
apiRouter.use(
  usersRouter.routes(),
  usersRouter.allowedMethods()
)

// Books router
apiRouter.use(
  booksRouter.routes(),
  booksRouter.allowedMethods()
)

export { apiRouter }