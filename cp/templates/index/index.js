import {CPAuthContainer, i18nWorker} from "#cp/controller/container.js";

export const IndexComponent = CPAuthContainer(async (req, res, next) => {
	const langCode = i18nWorker(req, res, next)
	res.redirect(`/${langCode}/dashboard`)
})
