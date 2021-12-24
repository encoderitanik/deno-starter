import { parseBody } from "../helpers.ts"
import { BaseController } from "./BaseController.ts"

interface Book {
  id: number
  title: string
  author: string
}

const books = new Map<string, Book>();
books.set("1", {
  id: 1,
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

export const booksController: BaseController = {
  find(res) {
    return res.success({
      books: Array.from(books.values()),
    })
  },
  findOne(res, ctx) {
    return res.success({
      data: books.get(
        ctx.params.id
      )
    })
  },
  async save(res, ctx) {
    const book = await parseBody(ctx.request)
    const id = crypto.randomUUID()

    const newBook = { id, ...book }
    books.set(id, newBook)

    return res.success({ data: newBook })
  },
  updateOne() { },
  deleteOne() { }
}