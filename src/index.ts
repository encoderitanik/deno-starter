import { Application } from "https://deno.land/x/oak@v10.1.0/mod.ts"
import { apiRouter } from './router.ts'

const app = new Application()

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get("X-Response-Time")
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timing
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set("X-Response-Time", `${ms}ms`)
})

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const host = !hostname || hostname === '0.0.0.0' ? 'localhost' : hostname
  console.log(`Listening on: ${secure ? "https://" : "http://"}${host}:${port}`)
})

app.addEventListener("error", (evt) => {
  console.log('ERROR', evt.error)
})

app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

await app.listen({ port: 4000 })