import { Router } from "../deps.ts";
import { usersController as controller } from '../controllers/UsersController.ts'
import { createRouterMiddleware as crm } from '../controllers/BaseController.ts'

const router = new Router({ prefix: '/users' })

router
	.get('/', crm(controller.find))
	.post('/', crm(controller.save))

	.get('/:id/emails', crm(controller.getEmails))

	.get('/:id', crm(controller.findOne))
	.patch('/:id', crm(controller.updateOne))
	.delete('/:id', crm(controller.deleteOne))


export const usersRouter = router
