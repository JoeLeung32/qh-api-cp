import {CPAuthContainer} from "#cp/shared/container.js";
import {Hepler} from "#cp/shared/helper.js";

export class Dashboard extends Hepler {
	constructor(req, res, error) {
		super(req, res, error);
		this.pageRender('html', {
			title: req.t('dashboard:Dashboard'),
			page: 'dashboard',
		})
	}
}

export const DashboardComponent = CPAuthContainer(async (req, res, next) => new Dashboard(req, res, next))
