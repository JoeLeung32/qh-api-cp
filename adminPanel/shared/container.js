import axios from "axios";

export const CPContainer = (callback) => (
	async (req, res, next) => new Promise((resolve, reject) => {
		try {
			// GET Token
			const authToken = req.signedCookies.token
			req.session.authToken = authToken

			// Token exist in cookie?
			if (authToken) {
				return res.redirect('/dashboard')
			}

			return callback(req, res, next).catch(next)
		} catch (e) {
			next(e)
		}
	})
)

export const CPAuthContainer = (callback) => (
	async (req, res, next) => {
		try {
			// GET Token
			const authToken = req.signedCookies.token
			req.session.authToken = authToken

			// Token exist in cookie?
			if (!authToken) {
				res.clearCookie('token')
				return res.redirect('/login')
			}

			// Valid Token (Recorded in database)
			axios.get(process.env.CP_API_ENDPOINT + 'api/admin/panel/guard', {
				headers: {
					'Authorization': 'Bearer ' + authToken
				}
			}).then(response => {
				if (response.status !== 200) {
					res.clearCookie('token')
					return res.redirect('/login')
				}
				res.cookie('token', authToken, {
					expires: new Date(response.data.expiry),
					path: '/',
					secure: true,
					signed: true,
				})
				return callback(req, res, next).catch(next)
			}).catch(e => {
				res.clearCookie('token')
				return res.redirect('/login')
			})
		} catch (e) {
			next(e)
		}
	}
)
