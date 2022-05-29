import { FormDataFile, base64 } from '../deps.ts'
import { Attachment } from '../types.d.ts'

export type ImgBBRaw = {
	id: string
	title: string
	url_viewer: string
	url: string
	display_url: string
	width: string
	height: string
	size: number
	time: string
	expiration: string
	image: {
		filename: string
		name: string
		mime: string
		extension: 'png'
		url: string
	}
	thumb: {
		filename: string
		name: string
		mime: string
		extension: 'png'
		url: string
	}
	medium?: {
		filename: string
		name: string
		mime: string
		extension: 'png'
		url: string
	}
	delete_url: string
}

export type ImgBBRes = {
	status: number
	success: boolean
	data: ImgBBRaw
}

export class ImgBB {
	private IMGBB_API_KEY = Deno.env.get('IMGBB_API_KEY')
	private IMGBB_UPLOAD_URL = Deno.env.get('IMGBB_UPLOAD_URL')

	private uploads: ImgBBRaw[] = []

	constructor(private files: FormDataFile[]) {}

	public async upload() {
		this.uploads = await this.uploadMany()
		return this.attachments
	}

	private uploadOne = async (
		file: FormDataFile
	): Promise<ImgBBRaw | undefined> => {
		if (!file.content) return

		if (!this.IMGBB_API_KEY || !this.IMGBB_UPLOAD_URL) return

		const base64String = base64.fromUint8Array(file.content)

		const formData = new FormData()
		formData.append('key', this.IMGBB_API_KEY)
		formData.append('image', base64String)

		const [err, res] = await this.toResolvableArray<ImgBBRes, unknown>(
			(
				await fetch(this.IMGBB_UPLOAD_URL, {
					method: 'POST',
					body: formData,
				})
			).json()
		)

		if (err || !res.success) return
		return res.data
	}

	private uploadMany = async (): Promise<ImgBBRaw[]> => {
		return (
			await Promise.all(
				this.files.map((file) => {
					return this.uploadOne(file)
				})
			)
		).filter(Boolean) as ImgBBRaw[]
	}

	private toResolvableArray = <Data extends unknown, Error extends unknown>(
		promise: Promise<unknown>
	): Promise<[Error, Data]> => {
		return new Promise((resolve) => {
			return promise
				.then((res) => resolve([null as Error, res as Data]))
				.catch((err) => resolve([err, null as Data]))
		})
	}

	private get attachments(): Attachment[] {
		return this.uploads.map((data: ImgBBRaw) => ({
			id: data.id,
			title: data.title,
			width: data.width,
			height: data.height,
			size: data.size,
			time: data.time,
			expiration: data.expiration,
			viewUrl: data.url_viewer,
			deleteUrl: data.delete_url,
			src: {
				full: data.url,
				thumb: data?.thumb?.url,
				medium: data?.medium?.url,
			},
		}))
	}
}
