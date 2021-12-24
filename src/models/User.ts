import { Model, DataTypes } from '../deps.ts'

export class User extends Model {
	static timestamps = true;
	static fields = {
		_id: {
			primaryKey: true,
		},
		firstName: DataTypes.STRING
	};
}