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