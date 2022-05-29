export type Attachment = {
	id: string
	title: string
	width: string
	height: string
	size: number
	time: string
	expiration: string
	viewUrl: string
	deleteUrl: string
	src: {
		full: string
		thumb: string
		medium?: string
	}
}
