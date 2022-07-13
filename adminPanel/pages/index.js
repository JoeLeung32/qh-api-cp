import {CPAuthContainer} from "#cp/shared/components/container.js";

export const IndexComponent = CPAuthContainer(async (req, res, next) => {
	res.redirect('dashboard')
})
