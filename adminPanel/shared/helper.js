export class Hepler {
	#req
	#res
	#error
	#locateUrl = {}
	#locateUrlMapping = {
		'en': 'en',
		'zh-CN': 'sc',
		'zh-TW': 'tc',
	}

	constructor(req, res, error) {
		this.#req = req
		this.#res = res
		this.#error = error
		process.env.LANGUAGE_SUPPORTED.split(',')
			.forEach((locale) => {
				const langCode = this.#locateUrlMapping[locale];
				this.#locateUrl[locale] = req.route.path.replace(':lng', langCode);
			})
	}

	pageRender(view, options) {
		const authToken = this.#req.session.authToken
		const props = {
			...options,
			isAuth: false,
			locateUrl: this.#locateUrl,
		}
		if (authToken && authToken.length) {
			props.isAuth = true
		}
		this.#res.render(view, props)
	}
}
