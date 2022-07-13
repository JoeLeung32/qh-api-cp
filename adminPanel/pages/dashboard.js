import {CPAuthContainer} from "#cp/shared/components/container.js";

export const DashboardComponent = CPAuthContainer(async (req, res, next) => {
	res.send('dashboard')
})
