import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

const router = new Router({ prefix: '/posts' })

router.get('/', ({ request, response }) => {
  console.log(request.hasBody, request.body());
  response.body = {
    message: "Welcome from /api/v1/posts"
  }
})

export const postsRouter = router
