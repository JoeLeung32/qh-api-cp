import {privateAPI} from "#cp/shared/axios.js";
import {CPAuthContainer, i18nWorker} from "#cp/shared/container.js";
import {Hepler} from "#cp/shared/helper.js";

export class Logout extends Hepler {
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
