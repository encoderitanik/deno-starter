import { z } from '../deps.ts'

const PostTagsSchema = z.object({
	userId: z.string().min(1),
})

const PostLikeSchema = z.object({
	userId: z.string().min(1),
	createdAt: z.date().default(() => new Date()),
})

const PostCommentSchema = z.object({
	userId: z.string().min(1),
	comment: z.string().min(1),

	repliesCount: z.number().default(0),

	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
})

PostCommentSchema.setKey(
	'replies',
	z.array(PostCommentSchema).default(() => [])
)

const PostAttachmentSchema = z.object({
	userId: z.string().min(1),
	createdAt: z.date().default(() => new Date()),
})

const PostSchema = z
	.object({
		userId: z.string().min(1),
		caption: z.string().optional(),

		tags: z.array(PostTagsSchema).default(() => []),
		tagsCount: z.number().default(0),

		likes: z.array(PostLikeSchema).default(() => []),
		likesCount: z.number().default(0),

		comments: z.array(PostCommentSchema).default(() => []),
		commentsCount: z.number().default(0),

		attachments: z
			.array(PostAttachmentSchema)
			.optional()
			.default(() => []),
		attachmentsCount: z.number().default(0),

		createdAt: z.date().default(() => new Date()),
		updatedAt: z.date().default(() => new Date()),
	})
	.refine(
		(data) => !!data.caption || !!data.attachments,
		'Either caption or attachments should be passed in.'
	)

// const NewPost = PostSchema.omit({
// 	tagsCount: true,
// 	likesCount: true,
// 	commentsCount: true,
// 	attachmentsCount: true,
// })

export { PostSchema }
export default PostSchema
