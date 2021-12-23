import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts"
import { booksRouter } from './router/books.router.ts'
import { postsRouter } from './router/posts.router.ts'

const apiRouter = new Router({ prefix: '/api/v1' })

// Posts router
apiRouter.use(
  postsRouter.routes(),
  postsRouter.allowedMethods()
)

// Books router
apiRouter.use(
  booksRouter.routes(),
  booksRouter.allowedMethods()
)

export { apiRouter }