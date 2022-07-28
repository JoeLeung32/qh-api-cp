import {CPAuthContainer} from "#cp/controller/container.js";
import {Helper} from "#cp/controller/helper.js";

class ErrorPage extends Helper {
	constructor(req, res, next) {
		super(req, res, next)
		res.status(404)
		this.pageRender('html/html', {
			title: req.t('error:Error404'),
			page: 'error/404',
			url: req.url
		})
	}
}

export const Error404Component = CPAuthContainer(async (req, res, next) => new ErrorPage(req, res, next))
