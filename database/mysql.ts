import { Database, MySQLConnector } from '../deps.ts'
import { User, Todo } from '../models/index.ts'

const {
	MYSQL_HOST = 'localhost',
	MYSQL_USERNAME = 'root',
	MYSQL_PASSWORD = '',
	MYSQL_PORT = 3306,
	MYSQL_DATABASE,
} = Deno.env.toObject()

export default {
	connect() {
		const connector = new MySQLConnector({
			host: MYSQL_HOST,
			port: +MYSQL_PORT,
			database: MYSQL_DATABASE,
			username: MYSQL_USERNAME,
			password: MYSQL_PASSWORD,
		});

		const db = new Database(connector);

		db.link([User, Todo])
		// db.sync()
		// db.sync({ drop: true })

		return db
	}
}