import { Router, upload, preUploadValidate } from '../deps.ts'
import { postsController as controller } from '../controllers/PostsController.ts'
import { createRouterMiddleware as crm } from '../controllers/BaseController.ts'

const router = new Router({ prefix: '/posts' })

router
	.get('/', crm(controller.find))
	.post('/', crm(controller.save))

	.post(
		'/upload',
		upload('uploads', {
			extensions: ['jpg', 'png'],
			maxSizeBytes: 20000000,
			maxFileSizeBytes: 10000000,
		}),
		(context: any) => {
			context.response.body = context.uploadedFiles
		}
	)
	.post(
		'/pre_upload',
		preUploadValidate(['jpg', 'png'], 20000000, 10000000),
		(context: any) => {
			context.response.body = { msg: 'Pass upload validations.' }
		}
	)

	.get('/:id', crm(controller.findOne))
	.patch('/:id', crm(controller.updateOne))
	.delete('/:id', crm(controller.deleteOne))

export const postsRouter = router
