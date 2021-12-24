import { Router } from "../deps.ts";
import { booksController as controller } from '../controllers/BooksController.ts'
import { createRouterMiddleware as crm } from '../controllers/BaseController.ts'

const router = new Router({ prefix: '/books' })

router
  .get('/', crm(controller.find))
  .post('/', crm(controller.save))
  .get('/:id', crm(controller.findOne))

export const booksRouter = router
