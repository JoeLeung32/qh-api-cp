import {publicAPI} from "#cp/controller/axios.js";
import {CPContainer} from "#cp/controller/container.js";
import {Hepler} from "#cp/controller/helper.js";

export class Login extends Hepler {
	constructor(req, res, next) {
		super(req, res, next)
		this.pageRender('html/html', {
			title: req.t('login:login'),
			page: 'login/login',
		})
	}
}

export const LoginComponent = CPContainer(async (req, res, next) => new Login(req, res, next))

export const LoginComponentPOST = CPContainer(async (req, res, next) => {
	const {lng} = req.params
	const username = req.body?.username
	const password = req.body?.password
	if (!username.length || !password.length) {
		throw new Error('No info')
	}

	publicAPI.post('panel/login', {
		username,
		password,
	})
		.then(response => {
			if (response.status !== 200) {
				throw new Error('API Status not 200')
			}

			const {token, expiry} = response.data
			res
				.cookie('token', token, {
					expires: new Date(expiry),
					path: '/',
					secure: true,
					signed: true,
				})
				.redirect(`/${lng}`)
		})
})

