import { Router } from "./deps.ts"
import { booksRouter } from './router/BooksRouter.ts'

const apiRouter = new Router({ prefix: '/api/v1' })

// Books router
apiRouter.use(
  booksRouter.routes(),
  booksRouter.allowedMethods()
)

export { apiRouter }