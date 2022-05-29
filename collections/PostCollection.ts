import { Bson } from '../deps.ts'
import { mongo } from '../database/mongo.ts'

type PostLike = {
	userId: Bson.ObjectId
	createdAt: Date
}

type PostComment = {
	comment: string
	userId: Bson.ObjectId
	replies: PostComment[]
	repliesCount: number

	createdAt: Date
	updatedAt: Date
}

type PostAttachment = {
	type: string
	url: string
	name: string
	size: number
}

type PostTag = {
	userId: Bson.ObjectId
}

export type PostSchema = {
	_id: Bson.ObjectId
	userId: Bson.ObjectId

	caption: string

	tags: PostTag[]
	tagsCount: number

	likes: PostLike[]
	likesCount: number

	comments: PostComment[]
	commentsCount: number

	attachments: PostAttachment[]
	attachmentsCount: number

	createdAt: Date
	updatedAt: Date
}



const Posts = mongo.collection<PostSchema>('posts')

export { Posts }
export default Posts
