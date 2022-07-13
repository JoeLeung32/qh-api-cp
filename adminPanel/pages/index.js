import {CPAuthContainer} from "#cp/components/container.js";

export const IndexComponent = CPAuthContainer(async (req, res, next) => {
	res.send('index')
})
