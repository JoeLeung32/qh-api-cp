import {CPContainer} from "#cp/components/container.js";

export const LoginComponent = CPContainer(async (req, res, next) => {
	res.render('login')
})
