import { Model, DataTypes, ModelFields } from '../deps.ts'

export class Todo extends Model {
	static timestamps = true;
	static table = 'todos'
	static fields: ModelFields = {
		id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING
		},
		description: {
			allowNull: true,
			type: DataTypes.STRING
		},
		isCompleted: {
			allowNull: false,
			type: DataTypes.BOOLEAN
		},
		deadline: {
			allowNull: true,
			type: DataTypes.TIMESTAMP
		}
	};

	static defaults = {
		isCompleted: false
	}
}

Todo.on('created', (todo: Todo) => {
	console.log('Created:', todo, todo.id)
})
Todo.on('updated', (todo: Todo) => {
	console.log('Updated:', todo, todo.id)
})
Todo.on('deleted', (todo: Todo) => {
	console.log('Deleted:', todo.id)
})