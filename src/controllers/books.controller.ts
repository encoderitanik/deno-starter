import { Status } from "https://deno.land/x/oak@v10.1.0/mod.ts"
import { RouterContext, Request } from "https://deno.land/x/oak@v10.1.0/mod.ts"

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

export const getBooks = (ctx: RouterContext<'/'>) => {
  ctx.response.body = Array.from(books.values());
}

type ResponseBody = {
  data?: any
  status?: Status
  message?: string
}
type Respond = (body: ResponseBody) => void
type Handler = <R extends string>(request: Request, respond: Respond, ctx: RouterContext<R>) => void

const control = <R extends string>(handler: Handler) => (ctx: RouterContext<R>) => {
  return handler(ctx.request, res => {
    ctx.response.status = res.status || Status.OK;
    ctx.response.body = {
      data: res.data,
      error: !res.data,
      success: !!res.data,
      message: res.message,
    }
  }, ctx)
}

const parseBody = async (request: Request) => {
  const body = request.body()

  if (body.type === 'json') return await body.value
  if (body.type === 'form-data') return (await body.value.read()).fields

  return body
}

export const createBook = control<'/'>(async (request, respond) => {
  const book = await parseBody(request)
  const id = crypto.randomUUID()

  const newBook = { id, ...book }
  books.set(id, newBook)

  return respond({ data: newBook })
})

export const getBook = (ctx: RouterContext<'/:id'>) => {
  if (books.has(ctx?.params?.id)) {
    ctx.response.body = books.get(ctx.params.id);
  }
}
