import { Database, MySQLConnector } from '../deps.ts'
import { User, Todo } from '../models/index.ts'

export default {
	connect() {
		const connector = new MySQLConnector({
			database: 'deno_land',
			host: 'localhost',
			username: 'rkanik',
			password: '*--*',
			port: 3306, // optional
		});

		const db = new Database(connector);

		db.link([User, Todo])
		// db.sync()
		// db.sync({ drop: true })

		return db
	}
}