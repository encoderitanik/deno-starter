import { Application } from "./deps.ts"
import { apiRouter } from './router.ts'
import './database.ts'

import mysql from './database/mysql.ts'

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
  ctx.response.headers.set("X-Response-Time", `${Date.now() - start}ms`)
})

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const host = !hostname || hostname === '0.0.0.0' ? 'localhost' : hostname
  console.log(`Listening on: ${secure ? "https://" : "http://"}${host}:${port}`)

  // connectDatabase()

  mysql.connect()
})

app.addEventListener("error", (evt) => {
  console.log('ERROR', evt.error)
})

app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

// Send static content
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

await app.listen({ port: 4000 })