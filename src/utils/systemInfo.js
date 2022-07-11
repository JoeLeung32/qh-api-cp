import {knex} from "#utils/database/index.js";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const PORT = process.env.PORT || 3000;

export const SystemInfoPath = '/nodeinfo';
export const SystemInfo = (req, res) => {
	try {
		const d = {
			origins: ALLOWED_ORIGINS,
			post: PORT,
			database: knex ? 'connected' : 'error',
		}
		res.json(d);
	} catch (e) {
		res.status(500).send(`<pre>${e.message}</pre>`);
	}
}
