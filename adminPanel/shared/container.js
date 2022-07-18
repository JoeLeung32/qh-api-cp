import {privateAPI, setBearerToken} from "./axios.js";

const URILngsMapping = {
	en: 'en',
	tc: 'zh-TW',
	sc: 'zh-CN',
}

export const i18nWorker = (req, res, next) => {
	const supportedLanguage = Object.keys(URILngsMapping)
	const {lng} = req.params
	switch (true) {
		case !lng || !supportedLanguage.includes(lng): {
			throw new Error('NOT_SUPPORTED_LANGUAGE')
		}
		case supportedLanguage.includes(lng): {
			req.i18n.changeLanguage(URILngsMapping[lng])
			break
		}
		case lng !== 'en': {
			req.i18n.changeLanguage(lng)
			break
		}
	}
	return lng // req.language = en | zh-TW | zh-CN; lng = en | tc | sc
}

const ErrorHandler = (req, res, next, e) => {
	switch (e.message) {
		case 'NOT_SUPPORTED_LANGUAGE': {
			return res.redirect(`/en`)
		}
		default: {
			next(e)
			break
		}
	}
}

export const CPContainer = (callback) => (
	async (req, res, next) => new Promise((resolve, reject) => {
		try {
			const langCode = i18nWorker(req, res, next)

			// GET Token
			const authToken = req.signedCookies.token
			req.session.authToken = authToken

			// Token exist in cookie?
			if (authToken) {
				return res.redirect(`/${langCode}/dashboard`)
			}

			return callback(req, res, next).catch(next)
		} catch (e) {
			ErrorHandler(req, res, next, e)
		}
	})
)

export const CPAuthContainer = (callback) => (
	async (req, res, next) => {
		try {
			const langCode = i18nWorker(req, res, next)

			// GET Token
			const authToken = req.signedCookies.token
			req.session.authToken = authToken
			setBearerToken(authToken)

			// Token exist in cookie?
			if (!authToken) {
				res.clearCookie('token')
				return res.redirect(`/${langCode}/login`)
			}

			// Valid Token (Recorded in database)
			privateAPI.get('panel/guard')
				.then(response => {
					if (response.status !== 200) {
						res.clearCookie('token')
						return res.redirect(`/${langCode}/login`)
					}
					res.cookie('token', authToken, {
						expires: new Date(response.data.expiry),
						path: '/',
						secure: true,
						signed: true,
					})
					return callback(req, res, next).catch(next)
				})
				.catch(e => {
					res.clearCookie('token')
					return res.redirect(`/${langCode}/login`)
				})
		} catch (e) {
			ErrorHandler(req, res, next, e)
		}
	}
)
