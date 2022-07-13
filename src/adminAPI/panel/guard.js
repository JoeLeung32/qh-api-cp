import {authedContainer} from "#utils/container.js";
import {knex} from "#utils/database/index.js";

export const PanelGuard = authedContainer(async (req, res, error, authToken) => {
	// Token Refresh
	const now = new Date().toISOString();
	let expiry = new Date();
	expiry.setTime(expiry.getTime() + parseInt(process.env.SESSION_TOKEN_LIFE));
	expiry = expiry.toISOString();

	await knex('ap-admin-token')
		.where({
			token: authToken,
			isValid: true
		})
		.update({
			updated_at: now,
			expiryAt: expiry
		})

	res.status(200).json({
		expiry: expiry
	})
})
