import {CPAuthContainer} from "#cp/shared/container.js";
import {Hepler} from "#cp/shared/helper.js";

export class Dashboard extends Hepler {
	constructor(req, res, next) {
		super(req, res, next)
		this.pageRender('html/html', {
			title: req.t('dashboard:Dashboard'),
			page: 'dashboard/dashboard',
		})
	}
}

export const DashboardComponent = CPAuthContainer(async (req, res, next) => new Dashboard(req, res, next))
