import {publicAPI} from "#cp/shared/axios.js";
import {CPContainer} from "#cp/shared/container.js";
import {Hepler} from "#cp/shared/helper.js";

export class Login extends Hepler {

	constructor(req, res, next) {
		super(req, res, next)
		switch (req.method) {
			case 'POST': {
				this.postMethod(req, res, next)
				break
			}
			default: {
				this.pageRender('html/html', {
					title: req.t('login:login'),
					page: 'login/login',
				})
				break;
			}
		}
	}

	postMethod(req, res, next) {
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
	}
}

export const LoginComponent = CPContainer(async (req, res, next) => new Login(req, res, next))

