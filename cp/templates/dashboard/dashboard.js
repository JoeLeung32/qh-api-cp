import {CPAuthContainer} from "#cp/controller/container.js";
import {Helper} from "#cp/controller/helper.js";

export class Dashboard extends Helper {
	constructor(req, res, next) {
		super(req, res, next)
		this.pageRender('html/html', {
			title: req.t('dashboard:Dashboard'),
			page: 'dashboard/dashboard',
		})
	}
}

export const DashboardComponent = CPAuthContainer(async (req, res, next) => new Dashboard(req, res, next))
