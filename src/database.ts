// import { Database, MongoDBConnector } from './deps.ts'
// import { User } from './models/User.ts'

import { Bson, MongoClient } from './deps.ts'
const MONGO_CONNECT_URI = "mongodb+srv://rkanik:0070-rkenger-0700@rkenger.ey4j9.mongodb.net/denoland?authMechanism=SCRAM-SHA-1"
// //"mongodb://rkanik:0070-rkenger-0700@rkenger-shard-00-00.ey4j9.mongodb.net:27017,rkenger-shard-00-01.ey4j9.mongodb.net:27017,rkenger-shard-00-02.ey4j9.mongodb.net:27017/deno-land?authMechanism=SCRAM-SHA-1&ssl=true&replicaSet=atlas-9ha2iq-shard-0&authSource=admin&retryWrites=true&w=majority"
// //"mongodb+srv://rkanik:0070-rkenger-0700@rkenger.ey4j9.mongodb.net/deno-land?authMechanism=SCRAM-SHA-1"

// export const connectDatabase = async () => {
// const connector = new MongoDBConnector({
// 	uri: MONGO_CONNECT_URI,
// 	database: 'denoland',
// })

// const db = new Database(connector)

// db.link([User])
// await db.sync()




const client = new MongoClient()

await client.connect(MONGO_CONNECT_URI).then(res => {
	console.log('MONGODB:', res)
})

type UserSchema = {
	_id: Bson.ObjectId;
	username: string;
}

const db = client.database("test");
export const Users = db.collection<UserSchema>("users");

// }


