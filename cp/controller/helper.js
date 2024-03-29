export class Helper {
	#req
	#res
	#next
	#locateUrl = {}
	#locateUrlMapping = {
		'en': 'en',
		'zh-CN': 'sc',
		'zh-TW': 'tc',
	}

	constructor(req, res, next) {
		this.#req = req
		this.#res = res
		this.#next = next
		process.env.LANGUAGE_SUPPORTED.split(',')
			.forEach((locale) => {
				const langCode = this.#locateUrlMapping[locale];
				this.#locateUrl[locale] = req.route.path.replace(':lng', langCode);
			})
	}

	pageRender(view, options) {
		const authToken = this.#req.session.authToken
		const props = {
			error: null,
			...options,
			isAuth: false,
			locateUrl: this.#locateUrl,
			lng: this.#req.params?.lng,
			env: process.env.NODE_ENV,
			pathCategory: this.#req.path.replace(/^\/|\/$/g, '').split('/')[1]
		}
		if (authToken && authToken.length) {
			props.isAuth = true
		}
		this.#res.render(view, props)
	}
}
