import { Request } from "./deps.ts"

export const parseBody = async (request: Request) => {
	const body = request.body()

	if (body.type === 'json') return await body.value
	if (body.type === 'form-data') return (await body.value.read()).fields

	return body
}