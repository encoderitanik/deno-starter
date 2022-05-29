import { Request, FormDataFile, FormDataReadOptions } from './deps.ts'

export const parseBody = async (
	request: Request
): Promise<{ [key: string]: any }> => {
	const body = request.body()

	if (body.type === 'json') return await body.value
	if (body.type === 'form-data') return (await body.value.read()).fields

	return body
}

export const parseBodyWithFiles = async (
	request: Request,
	options?: FormDataReadOptions
): Promise<[body: { [key: string]: unknown }, files: FormDataFile[]]> => {
	const body = request.body()

	if (body.type === 'json') return [await body.value, []]
	if (body.type === 'form-data') {
		const read = await body.value.read(options)
		return [read.fields, read.files || []]
	}

	return [body, []]
}
