import express from 'express'
import cors from 'cors'
import helmet from "helmet";

// Defining the Express app
export const app = express()
export const appGenericCORS = cors({
	origin: (origin, callback) => {
		const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
		const errMsgOfAllowedOrigins = 'The CORS policy for this site ' +
			'does not allow access from the specified Origin.'
		if (!origin) return callback(null, true)
		if (!allowedOrigins.includes(origin)) {
			return callback(new Error(errMsgOfAllowedOrigins), false)
		}
		return callback(null, true)
	},
	credentials: true,
})
export const helmetBasic = helmet()
