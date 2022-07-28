import {privateAPI} from "#cp/controller/axios.js";
import {CPAuthContainer, i18nWorker} from "#cp/controller/container.js";
import {Helper} from "#cp/controller/helper.js";

class Logout extends Helper {
	constructor(req, res, next) {
		super(req, res, next)
		const langCode = i18nWorker(req, res, next)

		privateAPI.get('panel/logout')
			.then(response => {
				res.clearCookie('token')
				return res.redirect(`/${langCode}/login`)
			})
	}
}

export const LogoutComponent = CPAuthContainer(async (req, res, next) => new Logout(req, res, next))
