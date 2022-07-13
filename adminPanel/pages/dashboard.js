import {CPAuthContainer} from "#cp/components/container.js";

export const DashboardComponent = CPAuthContainer(async (req, res, next) => {
	res.send('dashboard')
})
