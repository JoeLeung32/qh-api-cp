import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from "helmet";

// Defining the Express app
export const app = express()
export const corsConfig = {
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
}

// CORS
app.use(cors(corsConfig))

// Enhance API security
app.use(helmet());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

// Parse application/json
app.use(bodyParser.json())
