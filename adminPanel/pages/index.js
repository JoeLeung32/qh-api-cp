import {CPAuthContainer} from "#cp/shared/container.js";

export const IndexComponent = CPAuthContainer(async (req, res, next) => {
	res.redirect('dashboard')
})
