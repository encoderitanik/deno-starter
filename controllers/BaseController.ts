import { Status, RouterContext } from "../deps.ts"

type ErrorResponse = {
	status?: Status
	statusText?: string
	message?: string
	errors?: unknown[] | { [k: string]: unknown }
	[key: string]: unknown
}

type SuccessResponse = {
	status?: Status
	statusText?: string
	message?: string
	[key: string]: unknown
}

export type Response = {
	status: (status: Status) => Response
	error: (response: ErrorResponse) => void
	success: (response: SuccessResponse) => void
}

export type Controller<R extends string> = (
	res: Response,
	ctx: RouterContext<R>
) => void | Promise<void>

export type BaseController = {
	find: Controller<"/">
	save: Controller<"/">
	findOne: Controller<"/:id">
	updateOne: Controller<"/:id">
	deleteOne: Controller<"/:id">
	[k: string]: unknown
}

export type CursorResponse = {
	affectedRows: number
	lastInsertId: number
}

export const createRouterMiddleware = <R extends string>(controller: Controller<R>) => {
	return async (ctx: RouterContext<R>) => {

		let STATUS: Status
		const res: Response = {
			status: (status: Status) => {
				STATUS = status
				return res
			},
			error: (res: ErrorResponse) => {
				ctx.response.status = res.status || STATUS || Status.InternalServerError
				ctx.response.body = res
			},
			success: (res: SuccessResponse) => {
				ctx.response.status = res.status || STATUS || Status.OK
				ctx.response.body = res
			}
		}

		try {
			await controller(res, ctx)
		}
		catch (error) {
			ctx.response.status = Status.InternalServerError
			ctx.response.body = error.message
		}
	}
}