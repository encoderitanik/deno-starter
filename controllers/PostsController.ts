import { ImgBB } from '../utils/imgbb.ts'
import { parseBodyWithFiles } from '../helpers.ts'

import { BaseController } from './BaseController.ts'
import { Posts } from '../collections/PostCollection.ts'

type PostsController = BaseController

export const postsController: PostsController = {
	async find(res) {
		const posts = await Posts.find().toArray()
		return res.success({
			posts,
		})
	},
	async findOne(res, ctx) {},
	async save(res, ctx: any) {
		const [_, files] = await parseBodyWithFiles(ctx.request, {
			maxSize: 5000000,
		})

		const attachments = await new ImgBB(files).upload()
		return res.success({ attachments })
	},
	async updateOne(res, ctx) {},
	async deleteOne(res, ctx) {},
}
