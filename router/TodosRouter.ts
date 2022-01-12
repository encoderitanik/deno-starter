import { Router } from "../deps.ts";
import { todosController as controller } from '../controllers/TodosController.ts'
import { createRouterMiddleware as crm } from '../controllers/BaseController.ts'

const router = new Router({ prefix: '/todos' })

router
	.get('/', crm(controller.find))
	.post('/', crm(controller.save))

	.get('/:id', crm(controller.findOne))
	.patch('/:id', crm(controller.updateOne))
	.delete('/:id', crm(controller.deleteOne))

export const todosRouter = router
