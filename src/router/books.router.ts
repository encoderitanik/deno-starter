import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { getBooks, getBook, createBook } from '../controllers/books.controller.ts'

const router = new Router({ prefix: '/books' })

router
  .get('/', getBooks)
  .post('/', createBook)
  .get('/:id', getBook)

export const booksRouter = router
