import {knex} from "#utils/database/index.js";
import {publicAPI} from "#cp/controller/axios.js";
import {CPContainer} from "#cp/controller/container.js";
import {Helper} from "#cp/controller/helper.js";
import {passwordCrypt} from "#utils/bcrypt.js";

class Login extends Helper {
	constructor(req, res, next) {
		super(req, res, next)
		this.askAdminAccount({
			hasAccount: () => {
				this.pageRender('html/html', {
					title: req.t('login:Login'),
					page: 'login/login',
				})
			},
			noAccount: () => {
				this.pageRender('html/html', {
					title: req.t('login:Create Account'),
					page: 'login/create-account',
				})
			}
		})
	}

	async askAdminAccount(callbacks) {
		const sql = knex('ap-admin AS a')
			.count({total: '*'})
			.first()
		const {total} = await sql
		if (!total) {
			if (typeof callbacks.noAccount === 'function') {
				callbacks.noAccount()
			}
		} else {
			if (typeof callbacks.hasAccount === 'function') {
				callbacks.hasAccount()
			}
		}
	}
}

class LoginPost extends Helper {
	#req
	#res
	#next
	#lng

	constructor(req, res, next) {
		super(req, res, next)
		this.#req = req
		this.#res = res
		this.#next = next
		this.#lng = req.params?.lng

		const confirmPassword = req.body?.confirmPassword

		if (typeof confirmPassword !== 'undefined') {
			this.#createAccount()
				.catch((e) => {
					this.pageRender('html/html', {
						title: req.t('login:Create Account'),
						page: 'login/create-account',
						error: e,
					})
				})
		} else {
			this.#login()
		}
	}

	async #createAccount() {
		const username = this.#req.body?.username
		const password = this.#req.body?.password
		const confirmPassword = this.#req.body?.confirmPassword

		if (!username.length || !password.length || !confirmPassword.length) {
			throw new Error('Empty fields')
		}
		if (password !== confirmPassword) {
			throw new Error('Password and Confirm Password not match')
		}
		const hash = await passwordCrypt(password)
		knex('ap-admin')
			.insert({
				username: username,
				password: hash,
				createdAt: new Date(),
				isValid: true,
			})
			.then(() => {
				this.#login()
			})
	}

	#login() {
		const username = this.#req.body?.username
		const password = this.#req.body?.password

		if (!username.length || !password.length) {
			throw new Error('Empty fields')
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
				this.#res
					.cookie('token', token, {
						expires: new Date(expiry),
						path: '/',
						secure: true,
						signed: true,
					})
					.redirect(`/${this.#lng}`)
			})
	}

}

export const LoginComponent = CPContainer(async (req, res, next) => new Login(req, res, next))
export const LoginComponentPOST = CPContainer(async (req, res, next) => new LoginPost(req, res, next))

