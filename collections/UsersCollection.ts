import { Bson } from '../deps.ts'
import { mongo } from '../database/mongo.ts'

export type UserSchema = {
	_id: Bson.ObjectId
	firstName: string
	lastName: string
}

export const Users = mongo.collection<UserSchema>("users")