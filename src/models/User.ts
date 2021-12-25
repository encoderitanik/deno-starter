import { Model, DataTypes } from '../deps.ts'

export class User extends Model {
	static timestamps = true;
	static table = 'users'
	static fields = {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING
	};
}