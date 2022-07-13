import {authedContainer} from "#utils/container.js";
import {knex} from "#utils/database/index.js";
import {StatusCodes} from "#utils/error/errorMessage.js";

export const PanelSetting = authedContainer(async (req, res) => {
	const structure = {
		siteName: '',
		siteLogo: '',
	}
	const nameList = await knex('ap-panel-setting')
		.select('name').pluck('name');
	const matched = {};

	if (req.body) {
		Object.entries(req.body).forEach(([name, value]) => {
			if (typeof structure[name] !== 'undefined') {
				matched[name] = value;
			}
		})

		Object.entries(matched).forEach(async ([name, value]) => {
			const db = knex('ap-panel-setting')
			if (nameList.includes(name)) {
				await db.where('name', name)
					.update({
						value
					})
			} else {
				await db.insert({
					name,
					value
				})
			}
		}, Error())

		res.sendStatus(200);
		return;
	}

	throw StatusCodes.C400
})
