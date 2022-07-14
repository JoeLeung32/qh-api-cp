export class Hepler {
	#req
	#res
	#error

	constructor(req, res, error) {
		this.#req = req
		this.#res = res
		this.#error = error
	}

	pageRender(view, options) {
		const authToken = this.#req.session.authToken
		const props = {
			...options,
			isAuth: false
		}
		if (authToken && authToken.length) {
			props.isAuth = true
		}
		this.#res.render(view, props)
	}
}
