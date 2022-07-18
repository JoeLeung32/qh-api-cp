import {StatusCodes} from "#utils/error/errorMessage.js";
import {knex} from "#utils/database/index.js";

export const container = (callback) => (
	async (req, res, next) => {
		try {
			return callback(req, res, next).catch(next)
		} catch (e) {
			next(e)
		}
	}
)

export const authedContainer = (callback) => (
	async (req, res, next) => {
		try {
			// Get Token
			const authToken = req.headers?.authorization?.substring(7).trim();

			// Token exist in header?
			if (!authToken) {
				const error = new Error(StatusCodes.C400.message)
				error.statusCode = StatusCodes.C400.statusCode
				error.message += ', token is missed in header.'
				res.status(error.statusCode)
					.json({ message: error.message });
				return;
			}

			// Valid Token (Recorded in database)
			const sql = knex('ap-admin-token')
				.select('token')
				// .where('createdAt', '<=', now)
				.where('expiryAt', '>=', new Date())
				.where({
					token: authToken,
					isValid: true
				});
			const tokens = await sql
			if (!tokens || tokens.length !== 1) {
				res.status(StatusCodes.C401.statusCode)
					.json({ message: StatusCodes.C401.message });
				return;
			}

			// Passed
			return callback(req, res, next, authToken).catch(next);
		} catch (e) {
			next(e)
		}
	}
)
