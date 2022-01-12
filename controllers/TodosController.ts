import { BaseController, CursorResponse } from "./BaseController.ts"
import { parseBody } from "../helpers.ts"
import { Todo } from "../models/Todo.ts"
import { Status } from "../deps.ts"

type TodosController = BaseController

export const todosController: TodosController = {
	async find(res) {
		const todos = await Todo.all()
		return res.success({
			todos
		})
	},
	async findOne(res, ctx) {
		const todo = await Todo.find(ctx.params.id)
		if (!todo) {
			return res.status(Status.NotFound).error({
				message: `Todo not found with the id '${ctx.params.id}'`
			})
		}
		return res.success({ todo })
	},
	async save(res, ctx) {
		const body = await parseBody(ctx.request)
		const insertion = await Todo.create(body)

		if (!insertion.affectedRows) {
			return res.error({
				status: Status.InternalServerError,
				message: 'Error while creating Todo!'
			})
		}

		return res.status(Status.OK).success({
			todo: await Todo.find(
				insertion.lastInsertId as number
			)
		})
	},
	async updateOne(res, ctx) {
		const todo = await Todo.find(ctx.params.id)
		if (!todo) {
			return res.status(Status.NotFound).error({
				message: `Todo not found with the id '${ctx.params.id}'`
			})
		}

		const body = await parseBody(ctx.request)
		Object
			.entries(body)
			.forEach(([key, value]) => {
				key !== 'id' && (todo[key] = value)
			})

		const updatedTodo = await todo.update()
		return res.success({ todo: updatedTodo })
	},
	async deleteOne(res, ctx) {

		const todo = await Todo.find(ctx.params.id)
		if (!todo) {
			return res.status(Status.NotFound).error({
				message: `Todo not found with the id '${ctx.params.id}'`
			})
		}

		const deletion = (await todo.delete() as unknown) as CursorResponse

		if (!deletion.affectedRows) {
			return res.error({
				status: Status.InternalServerError,
				message: 'Error while deleting Todo!'
			})
		}

		return res.success({
			message: 'Todo deleted successfully!'
		})
	}
}