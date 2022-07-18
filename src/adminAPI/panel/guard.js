import {authedContainer} from "#utils/container.js";
import {knex} from "#utils/database/index.js";

export const PanelGuard = authedContainer(async (req, res, error, authToken) => {
	// Token Refresh
	const now = new Date();
	let expiry = new Date();
	expiry.setTime(expiry.getTime() + parseInt(process.env.SESSION_TOKEN_LIFE));

	await knex('ap-admin-token')
		.where({
			token: authToken,
			isValid: true
		})
		.update({
			updatedAt: now,
			expiryAt: expiry
		})

	res.status(200).json({
		expiry: expiry
	})
})
