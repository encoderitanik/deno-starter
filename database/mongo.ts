import { MongoClient, MongoDatabase } from '../deps.ts'

const MONGO_CONNECT_URI = (Deno.env.get('MONGO_HOST') || '')
	.replace('<username>', Deno.env.get('MONGO_USERNAME') || '')
	.replace('<password>', Deno.env.get('MONGO_PASSWORD') || '')
	.replace('<database>', Deno.env.get('MONGO_DATABASE') || '')

let mongo: MongoDatabase

try {
	const client = new MongoClient()
	await client.connect(MONGO_CONNECT_URI)
	mongo = client.database(Deno.env.get('MONGO_DATABASE'))
	console.log('MONGO::CONNECTED')
} catch (error) {
	console.log('MONGO::', error.message)
	throw new Error('MONGO::' + error.message)
}

export { mongo }
