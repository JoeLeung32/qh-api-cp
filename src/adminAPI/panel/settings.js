import {container} from "#utils/util.js";
import {knex} from "#utils/database/index.js";

export const PanelSetting = container(async (req, res) => {
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

	res.sendStatus(400);
})
