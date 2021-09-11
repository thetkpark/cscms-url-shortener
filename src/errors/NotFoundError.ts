export class NotFoundError extends Error {
	constructor(message?: string) {
		super(message || 'Not found')
		Object.setPrototypeOf(this, NotFoundError.prototype)
		this.name = 'NotFoundError'
	}
}
